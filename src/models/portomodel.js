const { Sequelize, DataTypes } = require('sequelize');
const connection = require('../config/db')


const Porto = connection.define(
  'portfolio',
  {
    name_apps: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    link_repo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    type: {
      type: DataTypes.ENUM('mobile', 'web'),
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    users_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
)

module.exports = Porto