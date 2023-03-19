import mongoose from 'mongoose';

export default class DB {

    public static async connect() {
        mongoose.set('strictQuery', true)
        
        let connected = await this.tryConnect()

        if (!connected) {
            console.log('Trying to reconnect');
            await this.connect()
        }

        return true;
    }

    private static async tryConnect(): Promise<boolean> {
        let dbHost = process.env.DB_HOSTNAME || '127.0.0.1'
        console.log('Trying to connect to DB');

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
