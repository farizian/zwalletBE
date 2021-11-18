const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/db")
const Users = require("./usersmodel")

const Transaction = db.define(
    "transaction",
    {
        sender:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        receiver:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        amount: {
            type: DataTypes.INTEGER
        },
        description:{
            type: DataTypes.TEXT
        },
        notes: {
            type: DataTypes.ENUM('Transfer', 'Top Up')
        },
        balance: {
            type: DataTypes.INTEGER
        },
        created_at: {
            type: DataTypes.DATE
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    }
);
Transaction.belongsTo(Users, { as: "senderUsers", foreignKey: "sender" });
Transaction.belongsTo(Users, { as: "receiverUsers", foreignKey: "receiver" });

module.exports = Transaction