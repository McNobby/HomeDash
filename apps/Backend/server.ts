import express from "express";
import Api from "./api/api.js";
import Authentication from "./api/Auth/Authentication.js";
import DB from "./dbconnect.js";

import dotenv from "dotenv";
import cors from "cors";

import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";

const app = express();
const mode = process.env.NODE_ENV || 'development';
console.log('Initializing Sentry in ' + mode + ' mode');
Sentry.init({
    dsn: "https://6044501f59f940968db97ba1416f8f73@o4504889279578112.ingest.sentry.io/4504889559154688",
    integrations: [
        // enable HTTP calls tracing
        new Sentry.Integrations.Http({ tracing: true }),
        // enable Express.js middleware tracing
        new Tracing.Integrations.Express({ app }),
    ],
    tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());


dotenv.config();

app.use(cors({
    origin: /(dash\.teobb\.no)|(localhost:[0-9]{3})|(172\.0\.0\.1)/
}))

// Request logging
app.use((req, res, next) => {
    console.log(req.method + " " + req.url);
    next();
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', new Api().getRouter())

app.use(Sentry.Handlers.errorHandler());

DB.connect().then(async () => {

    console.log('Creating admin if not already existing');

    const auth = new Authentication();
    await auth.createAdminIfNotAlreadyExisting();

    const port = process.env.PORT || 9000;
    app.listen(port, () => {
        console.log(`Server listening on port http://localhost:${port}/`)
    })
})