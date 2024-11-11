// MongoDB Photo Schema
const mongoose = require('mongoose');
const photoSchema = new mongoose.Schema({
    url: String,
    description: String
});
module.exports = mongoose.model('Photo', photoSchema);
