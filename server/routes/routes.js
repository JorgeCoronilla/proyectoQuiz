
const router = require("express").Router();
const Testcontroller = require('../controllers/test.controller')
const Usercontroller = require('../controllers/user.controller')
const Guestcontroller = require('../controllers/guest.controller');
const { verify } = require("jsonwebtoken");
router.get("/",Testcontroller.test.test1);
router.get("/test",Testcontroller.test.test2)
router.post("/login", Usercontroller.User.login)
router.post("/posts", verifyToken,Usercontroller.User.posts)
router.get("/join", Guestcontroller.Guest.join)



function verifyToken(req, res, next){
    const bearerHeader = req.headers['authorization']
    if(typeof bearerHeader !== "undefined"){
        const bearerToken=bearerHeader.split(" ")[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}
module.exports = router;