
const router = require("express").Router();
const Testcontroller = require('../controllers/test.controller')
const Usercontroller = require('../controllers/user.controller')
const Guestcontroller = require('../controllers/guest.controller');
const { verify } = require("jsonwebtoken");
const jwt = require("jsonwebtoken");
const cors = require("cors");

/*Test*/
router.get("/", Testcontroller.test.test1);
router.get("/test", verifyToken, Testcontroller.test.test2)


/*Home*/
router.post("/login", Usercontroller.User.login)
router.post("/register", Usercontroller.User.register)
router.post("/signin", Usercontroller.User.sigin)
router.post("/recover-pass", Usercontroller.User.recover)
router.post("/change-pass", Usercontroller.User.change_pass)
router.post("/check", verifyToken, Usercontroller.User.checker)

/*quizzes*/
router.post("/quizzes", Usercontroller.User.getQuizzes)
router.post("/quizzes/new", Usercontroller.User.insertQuizz)


/*questions*/
router.post("/questions/",Usercontroller.User.getQuestions), 
router.post("/questions/new",Usercontroller.User.insertQuestion), 
router.post("/questions/update",Usercontroller.User.updateQuestion), 

/*Guest*/
router.get("/join", Guestcontroller.Guest.join)


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
                res.json({ validation: false, mensaje: error.name })
            } else {
                console.log("Da paso")
                next();
            }
        })
    }
}
module.exports = router;