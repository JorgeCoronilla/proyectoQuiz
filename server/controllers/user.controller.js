const bcryptjs = require('bcryptjs');
const jwt = require("jsonwebtoken");
const sequelize = require('../ddbb/sql/index');
const UserModel = require('../ddbb/sql/models/User');
const QuizzModel = require('../ddbb/sql/models/Quizzes');
const QuestionModel = require('../ddbb/sql/models/Questions');
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
                res.json({ validation: false})
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
        const {  name_,topic,level_, token} = req.body
        console.log(token)
        console.log(req.body)
         
        jwt.verify(token, process.env.JWT_SECRET_KEY, (error, user) => {
             if (error) {
                 console.log(error)
             } else {userName=user.user_name}
          })
       
             try {
               var newQuizz= {fk_user_name: userName,
                    name_:name_,
                    topic:topic,
                    level_: level_, 
                    total_guests: 0, 
                    total_successful: 0}
     
                const data = await QuizzModel.create(newQuizz)
                res.json(data.dataValues.id)
                console.log(data.dataValues.id)
             } catch (error) {
                 console.log(error)
                 res.json({mensaje:"false"})
             }
         },
         
    insertQuestion: async (req, res) => {
        const { question,right_answer,wrong_answer1, wrong_answer2, wrong_answer3, quizz_id, token} = req.body
        console.log(token)
        console.log(req.body)
         
       jwt.verify(token, process.env.JWT_SECRET_KEY, (error, user) => {
             if (error) {
                 console.log(error)
             } else {userName=user.user_name}
          })
       
             try {
               var newQuestion= {fk_user_name: userName,
                question:question,
                right_answer:right_answer,
                wrong_answer1: wrong_answer1,
                wrong_answer2: wrong_answer2, 
                wrong_answer3: wrong_answer3, 
                quizz_id: quizz_id}
                 QuestionModel.create(newQuestion)
                     .then((data) => { 
                        res.json({ mensaje: true, id: data.id})})
                     .catch(err => {
                         if (err) { res.send(err) }
                     })
     
             } catch (error) {
                 res.json({mensaje:"false"})
             }
         },
          getQuestions: async (req, res) => {
            const {token, quizz_id} = req.body;
            jwt.verify(token, process.env.JWT_SECRET_KEY, (error, user) => {
                if (error) {
                    console.log(error);
                    res.json({ validation: false})
                } 
            }) 
            try {
                const questions = await QuestionModel.findAll({ where: { quizz_id: quizz_id } })
                console.log(questions); 
                res.json(questions)                
    
            } catch (error) {
               res.json({mensaje: false})
            }
        },
        updateQuestion: async (req, res) => {
            const { question,right_answer,wrong_answer1, wrong_answer2, wrong_answer3, id, token} = req.body
            console.log(token)
           console.log()
             
           jwt.verify(token, process.env.JWT_SECRET_KEY, (error, user) => {
                 if (error) {
                     console.log(error)
                 } else {userName=user.user_name}
              })
              console.log("pasa " + id)
                 try {
                   var newData= {
                    question:question,
                    right_answer:right_answer,
                    wrong_answer1: wrong_answer1,
                    wrong_answer2: wrong_answer2, 
                    wrong_answer3: wrong_answer3}
                     QuestionModel.update(newData,{ where: { id: id } })
                         .then((data) => { 
                            res.json({ mensaje: true, id: data.id})})
                         .catch(err => {
                             if (err) { res.send(err) }
                         })
         
                 } catch (error) {
                     res.json({mensaje:"false"})
                 }
             },
}
module.exports = { User }
