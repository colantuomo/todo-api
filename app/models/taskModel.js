const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    categoryId: String,
    userId: String,
    user: String,
    description: String,
    active: Boolean,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Task', TaskSchema);