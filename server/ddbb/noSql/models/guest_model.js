const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GuestSchema = new Schema({
  
    name: {
        type: String,
        required: true
    },
    quizzid: {
        type: Number,
        required: true,
    },

    session: {
        type: String,
        required: true,
    },

    totalQuestions: {
        type: Number,
        required: true,
    },

    answers: {
        type: Array,
        required: true,
    },

    state: {
        type: Boolean,
        required: true,
    },

    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
})

module.exports = mongoose.model('guest', GuestSchema);

