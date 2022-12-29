
const router = require("express").Router();
const Testcontroller = require('../controllers/test.controller')
const Usercontroller = require('../controllers/user.controller')
const Guestcontroller = require('../controllers/guest.controller');
const { verify } = require("jsonwebtoken");
const jwt = require("jsonwebtoken");

router.get("/", Testcontroller.test.test1);
router.get("/test", verifyToken, Testcontroller.test.test2)
router.post("/login", Usercontroller.User.login)
router.put("/register", Usercontroller.User.register)
router.post("/signin", Usercontroller.User.sigin)
router.post("/recover-pass", Usercontroller.User.recover)
router.post("/change-pass", Usercontroller.User.change_pass)
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
    let tokenRaw = req.cookies.session
    console.log("WWWW" + req.cookies.session)
    if (typeof tokenRaw !== "undefined") {
        req.token = tokenRaw;
        jwt.verify(req.token, process.env.JWT_SECRET_KEY, (error, authData) => {
            if (error) {
                res.json(error.name)
                res.sendStatus(403);
            } else {
                next(); }})}}
module.exports = router;