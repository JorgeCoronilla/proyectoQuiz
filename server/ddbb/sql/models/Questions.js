const { DataTypes} = require('sequelize');
const sequelize = require('../index');

const QuestionModel = sequelize.define('user_questions', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    fk_user_name: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: false
    },
    question: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: false
    },

    right_answer: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: false
    },
    wrong_answer1: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: false
    },
   
    wrong_answer2: {
        type: DataTypes.STRING,
        allowNull: true
    },
    
    wrong_answer3: {
        type: DataTypes.STRING,
        allowNull: true
    },

    quizz_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    timestamps: false
});

module.exports = QuestionModel