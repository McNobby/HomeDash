import mongoose from 'mongoose';

export default class DB {

    private static reties = 0;

    public static async connect() {
        mongoose.set('strictQuery', true)
        
        let connected = await this.tryConnect()

        if (!connected) {
            this.reties++;
            console.log('Trying to reconnect');
            if (this.reties > 6) {
                console.log('Failed to connect to DB, tried 6 times');
                throw new Error('Failed to connect to DB!');
            }
            await this.connect()
        }

        return true;
    }

    private static async tryConnect(): Promise<boolean> {
        let dbHost = process.env.DB_HOSTNAME || '127.0.0.1'
        console.log('Trying to connect to DB on ' + dbHost + ':27017');

        return mongoose.connect(`mongodb://${dbHost}:27017/dashboard`)
        .then(() =>{ 
            console.log('Connected to DB!');
            return true 
        })
        .catch((err) => {
            return false
        })
    }

}
