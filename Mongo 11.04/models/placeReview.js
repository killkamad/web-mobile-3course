const mongoose = require('mongoose');

const placeReviewSchema = new mongoose.Schema({
    body: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    user: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('placeRev', placeReviewSchema);
