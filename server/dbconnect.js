const mongoose = require('mongoose');

const connect = () => {
    let dbHost = process.env.DB_HOSTNAME || '127.0.0.1'
    mongoose.connect(`mongodb://${dbHost}:27017/dashboard`).catch(err => console.log(err))
    .then(() => console.log('Connected to DB'))
}

module.exports = connect;