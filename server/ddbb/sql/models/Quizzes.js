const { DataTypes} = require('sequelize');
const sequelize = require('../index');

const QuizzModel = sequelize.define('user_quizzes', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    fk_user_name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    name_: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },

    topic: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    level_: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
   
    total_guests: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    
    total_successful: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    timestamps: false
});

module.exports = QuizzModel