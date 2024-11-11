// MongoDB Photo Schema
const mongoose = require('mongoose');
const photoSchema = new mongoose.Schema({
    url: String,
    description: String
});
export default mongoose.model('Photo', photoSchema);
