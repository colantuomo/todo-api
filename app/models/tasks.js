const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    user: String,
    description: String,
    date: String,
    active: Boolean
})

module.exports = mongoose.model('Task', TaskSchema);