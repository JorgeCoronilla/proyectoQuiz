const bcryptjs = require('bcryptjs');
const jwt = require("jsonwebtoken");
const sequelize = require('../ddbb/sql/index');
const UserModel = require('../ddbb/sql/models/User');
const QuizzModel = require('../ddbb/sql/models/Quizzes');
const sendemail = require('../controllers/email.controller');

const User = {

    login: async (req, res) => {
        const { email, pass } = req.body

        try {
            let user = await UserModel.findOne({ where: { email } });
            let compare = bcryptjs.compareSync(pass, user.password_);
            let userData = {
                id: user.id,
                user_name: user.user_name,
                name_: user.name_,
                country: user.country,
                email: user.email,
                type_education: user.type_education,
                institution: user.institution,
                role_: user.role_,
                logo: user.logo
            }
            console.log(compare);

            if (compare) {
                const token = jwt.sign({
                    id: user.id,
                    user_name: user.user_name,
                    email: user.email
                }, process.env.JWT_SECRET_KEY, { expiresIn: '4h' })
                res.json({ validation: true, token, user: userData })

            } else { res.json({ validation: false }) }

        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    },

    register: async (req, res) => {
        
        //let jwtVerify = jwt.verify(req.body.jwt, process.env.JWT_SECRET_KEY);
          if (jwtVerify) {
            try {
                var passHash = await bcryptjs.hash(req.body.password_, 8)
                let newUser = {
                    user_name: req.body.user_name,
                    name_: req.body.name_,
                    country: req.body.country,
                    //email: jwtVerify.email,
                    email: "DD",
                    password_: passHash,
                    type_education: req.body.type_education,
                    institution: req.body.institution,
                    role_: "admin",
                    logo: "none",
                }
    
                UserModel.create(newUser)
                    .then((data) => { res.json({ mensaje: true }) })
                    .catch(err => {
                        if (err) { res.json({ mensaje: false }) }
                    })
    
            } catch (error) {
                //res.status(500)
                res.send(error.code)
            }
          } else {
            send.json({mensaje: false})
          }
        
    },

    sigin: async (req, res) => {
        
        try {
            const token = jwt.sign({ email: req.body.email }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' })
            await sendemail.emailToRegister(token, req.body.email);
            res.json({ mensaje: `Email enviado a ${req.body.email}`});
      
        } catch (error) {
            res.json({mensaje: false})
            
        }
    },
    recover: async (req, res) => {
        
        const { email } = req.body
        try {
            let user = await UserModel.findOne({ where: { email } });
          
            if (user) {
                const token = jwt.sign({ email: req.body.email }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' })
                await sendemail.recover(token, req.body.email, user.name_);
                res.json({ mensaje: `Email enviado a ${req.body.email}`, token });
            }

        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    },
    change_pass: async (req, res) => {
        const { newPass, token } = req.body
      
        try {
            jwt.verify(token, process.env.JWT_SECRET_KEY, (error, authData) => {
               
                if (error) {
                    res.json({mensaje: false});
                } else {
                    //authData
                    res.json({ mensaje: true })
                }
            })

        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    },
    checker: async (req, res) => {
        try {
           res.json({ mensaje: true })
        } catch (error) {
            res.send(error.message)
        }
    },
    getQuizzes: async (req, res) => {
        let token = req.body.token;
        let userName
        jwt.verify(token, process.env.JWT_SECRET_KEY, (error, user) => {
            if (error) {
                console.log("Error del token")
                //res.json({ validation: false, mensaje: error })
            } else {userName=user.user_name}
        }) 
        try {
            const quizzes = await QuizzModel.findAll({ where: { fk_user_name: userName } })
            console.log(quizzes); 
            res.json(quizzes)                

        } catch (error) {
           res.json({mensaje: false})
        }
    },
    insertQuizz: async (req, res) => {
        let token = req.body.token;
         let userName
         jwt.verify(token, process.env.JWT_SECRET_KEY, (error, user) => {
             if (error) {
                 console.log("Error del token")
                 //res.json({ validation: false, mensaje: error })
             } else {userName=user.user_name}
          })
        const {  name_,topic,level_} = req.body
             try {
                 let newQuizz = {
                        fk_user_name: userName,
                        name_:name_,
                        topic:topic,
                        level_: level_,
                        total_guests: 0,
                        total_successful: 0
                 }
     
                 QuizzModel.create(newQuizz)
                     .then((data) => { res.json({ mensaje: true }) })
                     .catch(err => {
                         if (err) { res.json({ mensaje: false }) }
                     })
     
             } catch (error) {
                 //res.status(500)
                 res.send(error.code)
             }
         }
    
          
}
module.exports = { User }
