const mongoose = require('mongoose');

const connect = () => {
    mongoose.connect('mongodb://192.168.166.174:27017/dashboard').catch(err => console.log(err))
    .then(() => console.log('Connected to DB'))
}

module.exports = connect;