// MongoDB Event Schema
import mongoose from 'mongoose';
const eventSchema = new mongoose.Schema({
    title: String,
    date: Date,
    description: String
});
export default mongoose.model('Event', eventSchema);
