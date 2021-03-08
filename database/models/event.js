var mongoose = require('mongoose');
var datetime = new Date();
const EventSchema = new mongoose.Schema({
    name: String,
    description: String,
    date: Date
});

const Event = mongoose.model('Event',EventSchema);
module.exports = Event;