const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    userId: String,
    name: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Category', CategorySchema);