const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true
    },
    poster: String,
    genre: String,
    days: Array,
    times: Array
})

module.exports = mongoose.model('movie', movieSchema);