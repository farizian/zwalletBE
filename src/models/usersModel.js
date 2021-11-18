const { Sequelize, DataTypes} = require("sequelize");
const db = require('../config/db')

const Users = db.define(
    "users",
    {
        firstname: {
            type: DataTypes.STRING,

        },
        lastname: {
            type: DataTypes.STRING,

        },
        email: {
            type: DataTypes.STRING,
              
        },
        password: {
            type: DataTypes.STRING,

        },
        phone: {
            type: DataTypes.NUMBER,

        },
        image: {
            type: DataTypes.STRING,

        },
        pin: {
            type: DataTypes.STRING,

        },
        description: {
            type: DataTypes.STRING,

        },
        balance: {
            type: DataTypes.NUMBER,

        },
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
)

module.exports = Users;