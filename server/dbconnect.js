const mongoose = require('mongoose');

const connect = () => {
    mongoose.connect('mongodb://127.0.0.1:27017/dashboard').catch(err => console.log(err))
    .then(() => console.log('Connected to DB'))
}

module.exports = connect;