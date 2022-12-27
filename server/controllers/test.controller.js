
const connSQL = require('../ddbb/sql/index');
const connMDB = require('../ddbb/noSql/index')
const questions = require('../ddbb/noSql/models/question_model')

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
      const pool = await connSQL();
      pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('connected as id ' + connection.threadId);
        connection.query('SELECT * from users LIMIT 2;', (err, rows) => {
          connection.release(); // return the connection to pool
          if (err) throw err;
          //console.log('The data from users table are: \n', rows);
          res.send(rows)
        });
      });
    } catch (e) {
      console.log(e);
      res.json(false);
    }
  }
}

module.exports = {
  test
} 