const { Schema, model } = require('mongoose');

const schema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    author: {
        type: Object,
        required: true
    },
    content: {
        type: Object,
        required: true,
    },
    techInfo: {
        type: Object,
        required: true
    }
});

const News = model('News', schema);

module.exports = News;