const bcyptjs = require('bcryptjs');
const jwt = require("jsonwebtoken");


const User = {
    login: async (req, res) => {
        const {email, pass} = req.body
        try {
            const userTest = {
                email: "jorge@saltedinburgh.co.uk", pass: "1234"
            }
            if (email==userTest.email && pass==userTest.pass){
                jwt.sign({user: userTest}, "secret",{expiresIn: '1h'}, (err, token) => {
                    res.json({token})
                })
            } else {res.json({mensaje:"No coincide?"})}
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    },
    posts: async (req, res) => {
        try {
            jwt.verify(req.token, "secret", (error, authData) =>{
                if(error){
                    res.sendStatus(403);
                } else {
                    res.json({
                        menaje: "Post creado",
                        authData
                    })
                }
            })
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }
}



module.exports = {
    User
} 