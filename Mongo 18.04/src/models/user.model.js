const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    roles: [{
        type: Schema.Types.ObjectId,
        ref: 'Role'
    }]
});

module.exports = mongoose.model('User', userSchema);
