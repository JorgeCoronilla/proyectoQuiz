const router = require("express").Router();
const Usercontroller = require('../controllers/user.controller')
const Gamecontroller = require('../controllers/game.cotroller')
const jwt = require("jsonwebtoken");

/*Home*/
router.post("/login", Usercontroller.User.login)
router.post("/register", Usercontroller.User.register)
router.post("/update", Usercontroller.User.update)
router.post("/signin", Usercontroller.User.sigin)
router.post("/recover-pass", Usercontroller.User.recover)
router.post("/change-pass", Usercontroller.User.change_pass)
router.post("/check", verifyToken, Usercontroller.User.checker)
router.post("/check-email", Usercontroller.User.emailChecker)

/*quizzes*/
router.post("/quizzes", Usercontroller.User.getQuizzes)
router.post("/quizzes/new", Usercontroller.User.insertQuizz)
router.post("/quizz", Usercontroller.User.getQuizz)
router.post("/quizz/update", Usercontroller.User.updateQuizz)
router.delete("/quizz/delete",Usercontroller.User.deleteQuizz),

/*questions*/
router.post("/questions",Usercontroller.User.getQuestions), 
router.post("/questions/new",Usercontroller.User.insertQuestion), 
router.post("/questions/update",Usercontroller.User.updateQuestion), 
router.delete("/questions/delete",Usercontroller.User.deleteQuestion),
router.post("/question/",Usercontroller.User.getQuestion),

/*Game*/
router.post("/game/session", Gamecontroller.Game.startSession),
router.post("/game/session/check", Gamecontroller.Game.checkSessionByQuizz),
router.post("/game/session/check_byid", Gamecontroller.Game.checkSessionByID),
router.post("/game/session/add_user", Gamecontroller.Game.addUser),
router.post("/game/session/close", Gamecontroller.Game.closeSession),
router.post("/game/session/start_guest", Gamecontroller.Game.startGuest),
router.post("/game/session/add_answer", Gamecontroller.Game.addGuestAnswer),
router.post("/game/session/question", Gamecontroller.Game.startQuestion),
router.post("/game/session/question/adding_answers", Gamecontroller.Game.addGuestAnswerInQuestion),
router.post("/game/session/question/get", Gamecontroller.Game.getQuestionByQID),


function verifyToken2(req, res, next) {
    const bearerHeader = req.headers['authorization']
    if (typeof bearerHeader !== "undefined") {
        const bearerToken = bearerHeader.split(" ")[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}

function verifyToken(req, res, next) {
    let tokenRaw = req.body.token
    if (typeof tokenRaw !== "undefined") {
        req.token = tokenRaw;
        jwt.verify(req.token, process.env.JWT_SECRET_KEY, (error, authData) => {
            if (error) {
                res.json({ error: error, mensaje: false })
            } else {
                next();
            }
        })
    }
}
module.exports = router;