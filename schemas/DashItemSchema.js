const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    title: String,
    description: String,
    image: String,
    link: String,
    dashId: String
})

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;