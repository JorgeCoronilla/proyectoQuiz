const mongoose = require('mongoose');

//MongoDB connection

mongoose.connect(process.env.DB_URI_MONGO, {useNewUrlPArser: true, useUnifiedTopology: true, maxPoolSize: 50, 
    wtimeoutMS: 2500})
const db = mongoose.connection;
db.on('error', (error) => console.log("error"));
db.once('open', ()=> console.log("Connected to db"));

const connect = () =>{return db}
module.exports = connect;