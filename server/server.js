//imports
const express = require('express');
const app = express();

require('dotenv').config();
const cors = require("cors");
const cookieParser = require('cookie-parser');

const router = require("./routes/routes");
const adminRoutes = require("./routes/adminRouter");
const quizzRoutes = require("./routes/quizzRoutes");
const questionsRoutes = require("./routes/questionsRoutes");

const PORT =  process.env.PORT;

//middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());
app.use(cookieParser());


//Routers
app.use("/", router);
app.use("/admin", adminRoutes);
app.use("/quizz", quizzRoutes);
app.use("/questions", questionsRoutes);

//Set upload folder as static
app.use(express.static('uploads'));

//
app.listen(PORT || 3002, () => {
    console.log(`Server started at http://127.0.0.1:${PORT}`);
});