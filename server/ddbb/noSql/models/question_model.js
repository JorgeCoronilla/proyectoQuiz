const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    
    session: {
        type: String,
        required: true,
    },
    questionid:{
        type: Number,
        required: true,
    },

    quizzid: {
        type: Number,
        required: true,
    },
       right_replies: {
        type: Array,
        required: true,
    },
    wrong1_replies: {
        type: Array,
        required: true,
    },
    wrong2_replies: {
        type: Array,
        required: true,
    },
    wrong3_replies: {
        type: Array,
        required: true,
    },
    users:{
        type: Array,
        required: true,
    },
    times:{
        type: Array,
        required: true,
    },
    points:{
        type: Array,
        required: true,
    }
})

module.exports = mongoose.model('question', QuestionSchema);