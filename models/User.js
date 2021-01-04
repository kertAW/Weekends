const { Schema, model } = require('mongoose');

const schema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
        required: true,
        default: false
    }
});

const User = model('Users', schema)

module.exports = User;