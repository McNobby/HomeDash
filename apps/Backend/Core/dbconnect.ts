import mongoose from 'mongoose';
import {NextFunction, Response} from "express";
import {captureMessage} from "@sentry/node";

export default class DB {

    private static reties = 0;
    private static tryingToConnect = false

    public static async connect() {
        mongoose.set('strictQuery', true)
        
        let connected = await this.tryConnect()

        if (!connected) {
            this.reties++;
            if (this.reties > 6) {
                console.log('Failed to connect to DB, tried 6 times');
                throw new Error('Failed to connect to DB!');
            }
            console.log('Trying to reconnect');
            await this.connect()
        }

        return true;
    }

    private static async tryConnect(): Promise<boolean> {
        let dbHost = '127.0.0.1'
        console.log('Trying to connect to DB on ' + dbHost + ':27017');

        return mongoose.connect(`mongodb://${dbHost}:27017/dashboard`)
        .then(() =>{ 
            console.log('Connected to DB!');
            this.tryingToConnect = true
            return true 
        })
        .catch(() => {
            return false
        })
    }

    public static async checkAndRepairConnection(res: Response, next: NextFunction ) {
        if (mongoose.connection.readyState !== 1) {
            res.status(500).send('DB connection lost, trying to reconnect');
            await this.connect()
            captureMessage('Server lost connection to DB but recovered')
            return
        }
        next()
    }

}
