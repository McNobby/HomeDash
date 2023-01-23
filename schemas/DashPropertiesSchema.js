const mongoose = require('mongoose');

const propertiesSchema = new mongoose.Schema({
    title: String,
    description: String,
    image: String,
})

const Dashboard = mongoose.model('Properties', propertiesSchema);

module.exports = Dashboard;