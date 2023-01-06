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
        type: Number,
        required: true,
    },
    wrong1_replies: {
        type: Number,
        required: true,
    },
    wrong2_replies: {
        type: Number,
        required: true,
    },
    wrong3_replies: {
        type: Number,
        required: true,
    },
    totalreplies:{
        type: Number,
        required: true,
    }
})

module.exports = mongoose.model('question', QuestionSchema);