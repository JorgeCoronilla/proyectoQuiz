const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit : 100, 
    host: process.env.HOST,
    user: process.env.USER,
    password:  process.env.PASS,
    database: process.env.DATABASE,
    debug    :  false
});

const connect = () =>{return pool}
module.exports = connect;