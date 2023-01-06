const QuizzSession = require('../ddbb/noSql/models/quizz_model');
const Guest = require('../ddbb/noSql/models/guest_model')
const Question = require('../ddbb/noSql/models/question_model')

const Game = {

    startSession: async (req, res) => {
        const { quizzid, total_questions, guests, state } = req.body
        let session = {quizzid, total_questions, guests, state}
        try {
            
            let newSession = new QuizzSession(session)
            newSession.save((err, session)=>{
                if (err) return console.error(err);
            console.log(session + " saved in ddbbb");
            res.json({mensaje: true, id: session._id})
            })
           

        } catch (error) {
           
            console.log(error)
            res.json(false)
        }
    },

    checkSessionByQuizz: async (req, res) => {
        const { quizzid } = req.body
        try {
            QuizzSession.findOne({ 'quizzid': quizzid, 'state': true }, function(err, session){
                if(err){
                    res.json({mensaje:false})
                    console.log(err)
                }
                else{
                    if(session) {
                        res.json({mensaje: true, id: session.id})
                    } else {
                        res.json({mensaje: false})
                    }
                }
            })
        } catch (error) {
            console.log(error)
            res.json({mensaje:false})
            console.log("Aqui")
        }
    },

    checkSessionByID: async (req, res) => {
        const { id } = req.body
        try {
            QuizzSession.findById(id, function(err, session){
                if(err){
                    res.json({mensaje:false})
                    console.log(err)
                }
                else{
                    
                    if(session) {
                        res.json({mensaje: true, state: session.state})
                    } else {
                        res.json({mensaje: false})
                    }
                    
                }
            })
        } catch (error) {
            console.log(error)
            res.json(false)
        }
    },

    addUser: async (req, res) => {
        const { _id, guest } = req.body
        try {
            QuizzSession.findByIdAndUpdate({_id},{ $push: { guests: guest } }, function(err, result){
                if(err){
                    res.json(false)
                    console.log(err)
                }
                else{
                    res.json({mensaje: true, id: result.id})
                }
            })
        } catch (error) {
            console.log(error)
            res.json(false)
        }
    },

    closeSession: async (req, res) => {
        const { _id } = req.body
        try {
            QuizzSession.findByIdAndUpdate({_id},{ state: false } , function(err, result){
                if(err){
                    res.json(false)
                    console.log(err)
                }
                else{
                    res.json(true)
                }
            })
        } catch (error) {
            console.log(error)
            res.json(false)
        }
    },

    startGuest: async (req, res) => {
        const { quizzid, name, session,totalQuestions, answers, state } = req.body
        let guest = {quizzid, name, session,totalQuestions, answers, state}
        try {
            let newGuest = new Guest(guest)
            newGuest.save((err, guest)=>{
                if (err) return console.error(err);
            console.log(guest + " saved in ddbbb");
            res.json({mensaje: true, id: guest._id})
            })
        } catch (error) {
           
            console.log(error)
            res.json(false)
        }
    },

    addGuestAnswer: async (req, res) => {
        const { _id, answer } = req.body
        try {
            Guest.findByIdAndUpdate({_id},{ $push: { answers: answer } }, function(err, result){
                if(err){
                    res.json(false)
                    console.log(err)
                }
                else{
                    res.json(true)
                }
            })
        } catch (error) {
            console.log(error)
            res.json(false)
        }
    },

    startQuestion: async (req, res) => {
        const { session, quizzid, questionid,right_replies, wrong1_replies, wrong2_replies, wrong3_replies,totalreplies } = req.body
        let question = {session, quizzid,questionid, right_replies,wrong1_replies, wrong2_replies, wrong3_replies, totalreplies}
        try {
            let newQuestion = new Question(question)
            newQuestion.save((err, guest)=>{
                if (err) return console.error(err);
            console.log(guest + " saved in ddbbb");
            res.json({mensaje: true})
            })
        } catch (error) {
           
            console.log(error)
            res.json(false)
        }
    },
}

    module.exports = { Game }