const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const video_quizzSchema = new Schema({
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
    video: {
        type: String,
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

module.exports = mongoose.model('video_quizz', video_quizzSchema);