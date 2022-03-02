const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    image:{
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    desc:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Event',eventSchema)