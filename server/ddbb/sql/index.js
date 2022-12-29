const { Sequelize } = require('sequelize');

const pool = new Sequelize(
    process.env.DATABASE,
    process.env.USER,
    process.env.PASS, {
    host: process.env.HOST,
    dialect: 'mysql',
    pool: {
        max: 100,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}
);
module.exports = pool;


//const mysql = require('mysql2');
/*
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

*/