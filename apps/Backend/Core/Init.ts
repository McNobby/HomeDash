import express from "express";
import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";
import cors from "cors";
import dotenv from "dotenv";
import DB from "./dbconnect.js";
import Authentication from "../api/Auth/Authentication.js";

export default class Init {

    private static instance: Init;

    app: express.Application;
    mode: string;
    serverPort: string | number;
    private sentryInitialized = false;
    private errorHandlerInitialized = false;
    public dbConnected = false;
    private registerRoutesCallback?: (app: express.Application) => void;

    protected constructor() {
        this.app = express();
        dotenv.config();
        this.serverPort =  process.env.PORT || 9000;
        this.mode = process.env.NODE_ENV || 'development';

        this.initSentry();
        this.initRequestLogging();

        this.app.use(cors({
            origin: /(dash\.teobb\.no)|(localhost:[0-9]{3})|(172\.0\.0\.1)/
        }))

        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))

        this.app.use((req, res, next) => DB.checkAndRepairConnection(res, next))
    }


    public static getInstance(): Init {
        if (!Init.instance) {
            Init.instance = new Init();
        }
        return Init.instance;
    }


    private initRequestLogging(): void {
        // Request logging
        this.app.use((req, res, next) => {
            console.log(req.method + " " + req.url);
            next();
        })
    }


    private initSentry(): void {
        console.log('Initializing Sentry in ' + this.mode + ' mode');
        Sentry.init({
            dsn: "https://6044501f59f940968db97ba1416f8f73@o4504889279578112.ingest.sentry.io/4504889559154688",
            integrations: [
                // enable HTTP calls tracing
                new Sentry.Integrations.Http({tracing: true}),
                // enable Express.js middleware tracing
                new Tracing.Integrations.Express({app: this.app}),
            ],
            tracesSampleRate: 1.0,
        });

        this.app.use(Sentry.Handlers.requestHandler());
        this.app.use(Sentry.Handlers.tracingHandler());
        this.sentryInitialized = true;
    }


    public async startServer(): Promise<void> {
        if (!this.registerRoutesCallback) {
            throw new Error('No routes registered!');
        }

        this.registerRoutesCallback(this.app)

        let connected = await DB.connect()
        if (!connected) {
            throw new Error('Failed to connect to DB!');
        }
        this.dbConnected = connected;

        console.log('Creating admin if not already existing');
        const auth = new Authentication();
        await auth.createAdminIfNotAlreadyExisting();

        this.initErrorHandler();

        this.app.listen(this.serverPort, () => {
            console.log(`Server listening on port http://localhost:${this.serverPort}/`)
        })

    }


    private initErrorHandler() {
        if (!this.errorHandlerInitialized) {
            this.app.use(Sentry.Handlers.errorHandler());
        }
    }

    public registerRoutes(registerRoutesCallback: (app: express.Application) => void): Init {
        this.registerRoutesCallback = registerRoutesCallback;
        return this;
    }


}