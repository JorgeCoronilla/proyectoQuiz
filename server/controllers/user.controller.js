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
            res.json({ validation: false})
        }
    },

    register: async (req, res) => {
        try {
            var passHash = await bcryptjs.hash(req.body.password_, 8)
            let newUser = {
                user_name: req.body.user_name,
                name_: req.body.name_,
                country: req.body.country,
                email: req.body.email,
                password_: passHash,
                type_education: req.body.type_education,
                institution: req.body.institution,
                role_: "admin",
                logo: "none",
            }

            UserModel.create(newUser)
                .then((data) => { res.json({ mensaje: true }) })
                .catch(err => {
                    if (err) {
                        console.log(err)
                        res.json({ mensaje: false })
                    }
                })

        } catch (error) {
            res.json({mensaje: false})
            console.log(error)
        }


    },

    update: async (req, res) => {
       
        try {
             
            let newData = {
                name_: req.body.name_,
                country: req.body.country,
                email: req.body.email,
                type_education: req.body.type_education,
                institution: req.body.institution
            }
            let user = await UserModel.update( newData , { where: { email: req.body.email } })
            console.log(user)
            res.json({ mensaje: true })
           
        } catch (error) {
            res.json({mensaje: false})
            console.log(error)
        }
           

    },

    sigin: async (req, res) => {

        try {
            const token = jwt.sign({ email: req.body.email }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' })
            await sendemail.emailToRegister(token, req.body.email);
            res.json({ mensaje: `Email enviado a ${req.body.email}` });

        } catch (error) {
            res.json({ mensaje: false })

        }
    },
    recover: async (req, res) => {

        const { email } = req.body
        try {
            let user = await UserModel.findOne({ where: { email } });

            if (user) {
                const token = jwt.sign({ email: req.body.email }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' })
                await sendemail.recover(token, req.body.email, user.name_);
                console.log({ mensaje: `Email enviado a ${req.body.email}`, token });
                res.json({mensaje: true})
            }

        } catch (error) {
            res.json({mensaje: false})
            console.log(error)
        }
    },
    change_pass: async (req, res) => {
        const { password_, token } = req.body
        var passHash = await bcryptjs.hash(password_, 8);
        try {
            jwt.verify(token, process.env.JWT_SECRET_KEY, (error, authData) => {

                if (error) {
                    console.log(error)
                    res.json({ mensaje: false });
                } else {

                  
                    UserModel.update({ password_: passHash }, { where: { email: authData.email } })
                    .then((data) => {
                        console.log(data)
                        res.json({ mensaje: true })
                    })
                    .catch(err => {
                        if (err) { res.send(err) }
                    })
                    
                }
            })

        } catch (error) {
            res.json({mensaje: false})
            console.log(error)
        }
    },
    checker: async (req, res) => {
        try {
            console.log("llega")
            res.json({ mensaje: true })
        } catch (error) {
            res.json({ mensaje: false })
        }
    },
    emailChecker: async (req, res) => {
        jwt.verify(req.body.token, process.env.JWT_SECRET_KEY, (error, email) => {
            if (error) { res.json({ mensaje: false }) } else {
                res.json({ mensaje: true, email: email.email })
            }
        });
    }
    ,
    getQuizzes: async (req, res) => {
        let token = req.body.token;
        let userName
        jwt.verify(token, process.env.JWT_SECRET_KEY, (error, user) => {
            if (error) {
                console.log("Error del token")
                res.json({ validation: false })
            } else { userName = user.user_name }
        })
        if (userName) {
            try {
                const quizzes = await QuizzModel.findAll({ where: { fk_user_name: userName } })
                console.log(quizzes);
                res.json(quizzes)

            } catch (error) {
                res.json({ mensaje: false })
            }
        }

    },
    getQuizz: async (req, res) => {
        const { token, id } = req.body;
        let userName;
        jwt.verify(token, process.env.JWT_SECRET_KEY, (error, user) => {
            if (error) {
                console.log("Error del token")
                res.json({ validation: false })
            } else { userName = user.user_name }
        })

        if (userName) {

            try {
                const quizzes = await QuizzModel.findOne({ where: { id: id } })
                console.log(quizzes);
                res.json(quizzes)

            } catch (error) {
                res.json({ mensaje: false })
            }
        }

    },
    insertQuizz: async (req, res) => {
        const { name_, topic, level_, token } = req.body
        console.log(token)
        console.log(req.body)

        jwt.verify(token, process.env.JWT_SECRET_KEY, (error, user) => {
            if (error) {
                console.log(error)
            } else { userName = user.user_name }
        })

        try {
            var newQuizz = {
                fk_user_name: userName,
                name_: name_,
                topic: topic,
                level_: level_,
                total_guests: 0,
                total_successful: 0
            }

            const data = await QuizzModel.create(newQuizz)
            res.json(data.dataValues.id)
            console.log(data.dataValues.id)
        } catch (error) {
            console.log(error)
            res.json({ mensaje: "false" })
        }
    },
    deleteQuizz: async (req, res) => {
        const { id, token } = req.body
        jwt.verify(token, process.env.JWT_SECRET_KEY, (error, user) => {
            if (error) {
                console.log(error)
            } else { userName = user.user_name }
        })
        try {
            QuizzModel.destroy({ where: { id: id } })
                .then((data) => {
                    res.json({ mensaje: true })
                })
                .catch(err => {
                    if (err) { res.send(err) }
                })

        } catch (error) {
            console.log(error)
            res.json({ mensaje: "false" })
        }
    },

    updateQuizz: async (req, res) => {
        const { name_, topic, level_, id, token } = req.body
        console.log(token)
        console.log()

        jwt.verify(token, process.env.JWT_SECRET_KEY, (error, user) => {
            if (error) {
                console.log(error)
            } else { userName = user.user_name }
        })
        console.log("pasa " + id)
        try {
            var newData = {
                name_: name_,
                topic: topic,
                level_: level_,

            }
            QuizzModel.update(newData, { where: { id: id } })
                .then((data) => {
                    res.json({ mensaje: true, id: data.id })
                })
                .catch(err => {
                    if (err) { res.send(err) }
                })

        } catch (error) {
            res.json({ mensaje: "false" })
        }
    },

    insertQuestion: async (req, res) => {
        const { question, right_answer, wrong_answer1, wrong_answer2, wrong_answer3, quizz_id, token } = req.body
        console.log(token)
        console.log(req.body)

        jwt.verify(token, process.env.JWT_SECRET_KEY, (error, user) => {
            if (error) {
                console.log(error)
            } else { userName = user.user_name }
        })

        try {
            var newQuestion = {
                fk_user_name: userName,
                question: question,
                right_answer: right_answer,
                wrong_answer1: wrong_answer1,
                wrong_answer2: wrong_answer2,
                wrong_answer3: wrong_answer3,
                quizz_id: quizz_id
            }
            QuestionModel.create(newQuestion)
                .then((data) => {
                    res.json({ mensaje: true, id: data.id })
                })
                .catch(err => {
                    if (err) { res.send(err) }
                })

        } catch (error) {
            res.json({ mensaje: "false" })
        }
    },
    getQuestions: async (req, res) => {
        const { token, quizz_id } = req.body;
        jwt.verify(token, process.env.JWT_SECRET_KEY, (error, user) => {
            if (error) {
                console.log("Error del token")
                res.json({ mensaje: false })
            } else { 
                
                userName = user.user_name
                if (userName) {
                    try {
        
                        QuestionModel.findAll({ where: { quizz_id: quizz_id } })
                        .then((data) => {
                            res.json(data)
                        })
                        .catch(err => {
                            if (err) { res.json({mwnsaje:false});
                        console.log(err) }
                        })
                    } catch (error) {
                        console.log(error)
                        res.json({ mensaje: false })
                    }
                } else {
                    res.json({ mensaje: false })
                }
        
            
            }
        })

      


    },
    getQuestion: async (req, res) => {
        const { token, id } = req.body;
        let userName
        jwt.verify(token, process.env.JWT_SECRET_KEY, (error, user) => {
            if (error) {
                console.log("Error del token")
                res.json({ validation: false })
            } else { userName = user.user_name }
        })

        if (userName) {
            try {
                QuestionModel.findOne({ where: { id: id } }).then((data) => {
                    res.json(data)
                })
                .catch(err => {
                    if (err) { res.json({mwnsaje:false});
                console.log(err) }
                })
               

            } catch (error) {
                res.json({ mensaje: false })
            }
        }

    },
    updateQuestion: async (req, res) => {
        const { question, right_answer, wrong_answer1, wrong_answer2, wrong_answer3, id, token } = req.body
        console.log(token)
        console.log()

        jwt.verify(token, process.env.JWT_SECRET_KEY, (error, user) => {
            if (error) {
                console.log(error)
            } else { userName = user.user_name }
        })
        console.log("pasa " + id)
        try {
            var newData = {
                question: question,
                right_answer: right_answer,
                wrong_answer1: wrong_answer1,
                wrong_answer2: wrong_answer2,
                wrong_answer3: wrong_answer3
            }
            QuestionModel.update(newData, { where: { id: id } })
                .then((data) => {
                    res.json({ mensaje: true, id: data.id })
                })
                .catch(err => {
                    if (err) { res.send(err) }
                })

        } catch (error) {
            res.json({ mensaje: "false" })
        }
    },

    deleteQuestion: async (req, res) => {
        const { id, token } = req.body
        jwt.verify(token, process.env.JWT_SECRET_KEY, (error, user) => {
            if (error) {
                console.log(error)
            } else { userName = user.user_name }
        })
        try {
            QuestionModel.destroy({ where: { id: id } })
                .then((data) => {
                    res.json({ mensaje: true })
                })
                .catch(err => {
                    if (err) { res.send(err) }
                })

        } catch (error) {
            console.log(error)
            res.json({ mensaje: "false" })
        }
    },
}
module.exports = { User }
