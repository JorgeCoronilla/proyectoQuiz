

const DataTypes = require('sequelize');
userModel = {
    create: async (sequelize) => {
        const Users = sequelize.define('users', {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            user_name: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false
            },
            name_: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false
            },
    
            country: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false
            },
           
            password_: {
                type: DataTypes.STRING,
                allowNull: false
            },
            
            type_education: {
                type: DataTypes.STRING,
                allowNull: true
            },
            institution: {
                type: DataTypes.STRING,
                allowNull: true
            },
            logo: {
                type: DataTypes.STRING,
                allowNull: true
            }
        }, {
            timestamps: false
        });

        return Users;

    }
}

module.exports = userModel;