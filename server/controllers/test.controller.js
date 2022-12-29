const UserModel = require('../ddbb/sql/models/User')
const connMDB = require('../ddbb/noSql/index')
const questions = require('../ddbb/noSql/models/question_model');
const { JsonWebTokenError } = require('jsonwebtoken');
const jwt = require("jsonwebtoken");

const test = {
  test1: async (req, res) => {
    try {

    questions.find().exec(async function (err, result) {
        if (err) throw err;
        res.send(result);
    });
    } catch (e) {
      console.log(e);
      res.json(false);
    }

  },
  test2: async (req, res) => {
    try {
          const user = await UserModel.findAll();
          res.json(user)
          console.log(req.cookies.session)

     // jwt.verify(req.token, process.env.JWT_SECRET_KEY, (error, authData) => {
      /*/  if (error) {
            res.sendStatus(403);
        } else {*/
          //let id = getIdFromCookie(req.token)
        //  console.log("id" + id) 
/*
        pool.getConnection((err, connection) => {
            if (err) throw err;
            console.log('connected as id ' + connection.threadId);
            connection.query('SELECT * from users;', (err, rows) => {
              connection.release(); // return the connection to pool
              if (err) throw err;
              console.log('The data from users table are: \n', rows);
              res.json(rows)
            });
          });

          */
       // }
   // }
   // )
    } catch (e) {
      console.log(e);
      res.json(false);
    }
  }
}



   /**
     * Devuelve la id del usuario que tiene sesion iniciada
     * @param {json} req 
     * @param {json} res 
     * @returns {integer}
     */
const getIdFromCookie = (token) => {
    let jwtVerify = jwt.verify(token, process.env.JWT_SECRET_KEY);
    return jwtVerify.id
}
module.exports = {
  test
} 