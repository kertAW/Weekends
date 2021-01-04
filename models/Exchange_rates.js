const { Schema, model } = require('mongoose');

const schema = new Schema({
    rates: {
        type: String,
        required: true,
        unique: true
    },
    json: {
        type: Object,
        required: true,
    }
})

const Exchange_rates = model('Exchange_rates', schema);

module.exports = Exchange_rates;