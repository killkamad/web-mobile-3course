const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true,
    },
    poster: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    days: {
        type: Array,
        required: false
    },
    times: {
        type: Array,
        required: false
    }
});

module.exports = mongoose.model('movie', movieSchema);