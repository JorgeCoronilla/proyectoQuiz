const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuizzSchema = new Schema({
    
    quizzid: {
        type: String,
        required: true
    },
    total_questions: {
        type: Number,
        required: true,
    },
    guests: {
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

module.exports = mongoose.model('quizz', QuizzSchema);