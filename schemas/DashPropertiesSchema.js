const mongoose = require('mongoose');

const propertiesSchema = new mongoose.Schema({
    title: String,
    description: String,
    image: String,
    owner: mongoose.Types.ObjectId
})

const Dashboard = mongoose.model('Properties', propertiesSchema);

module.exports = Dashboard;