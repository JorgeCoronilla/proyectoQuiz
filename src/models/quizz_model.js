const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quizzSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    questions_id: {
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

module.exports = mongoose.model('quizz', quizzSchema);