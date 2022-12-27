const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    question: {
        type: String,
        required: true
    },
    right_answer: {
        type: String,
        required: true,
    },
    wrong_answers: {
        type: Array,
        required: true,
    },
    level: {
        type: String,
        required: true,
    },
    topic: {
        type: String,
        required: true,
    },
    creation_date: {
        type: Date,
        required: true,
        default: Date.now,
    },
})

module.exports = mongoose.model('question', questionSchema);