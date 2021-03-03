var mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

const User = mongoose.model('User',TaskSchema);
module.exports = User;
