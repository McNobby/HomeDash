const mongoose = require('mongoose');

const propertiesSchema = new mongoose.Schema({
    title: String,
    description: String,
    image: String,
    humanName: String,
})

const Dashboard = mongoose.model('Properties', propertiesSchema);

module.exports = Dashboard;