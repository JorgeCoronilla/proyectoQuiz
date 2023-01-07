//imports


const express = require('express');
const app = express();
require('dotenv').config();
const cors = require("cors");
const cookieParser = require('cookie-parser');

const router = require("./routes/routes");

const PORT =  process.env.PORT;


//middlewares
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());



//Routers
app.use("/", router);

//Set upload folder as static
app.use(express.static('uploads'));

//
const mongoose = require('mongoose');
//MongoDB connection

mongoose.connect(process.env.DB_URI_MONGO, {useNewUrlPArser: true, useUnifiedTopology: true, maxPoolSize: 50, 
    wtimeoutMS: 2500})
const db = mongoose.connection;
db.on('error', (error) => console.log("error"));
db.once('open', ()=> console.log("Connected to db"));

const connect = () =>{return db}
module.exports = connect;




//

app.listen(PORT || 3002, () => {
    console.log(`Server started at http://127.0.0.1:${PORT}`);
});