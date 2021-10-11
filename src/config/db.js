const mysql = require('mysql2')
const { Sequelize } = require('sequelize')
const {DB_USERNAME, DB_PASSWORD, DB} = require("../helpers/env")

const connection = new Sequelize(DB, DB_USERNAME, DB_PASSWORD, {
    host   : "localhost",
    dialect: "mysql",
});

connection.authenticate()
  .then(() => {
    console.log("koneksi aman")
  }).catch((err) => {
    console.log(err)
  })
// const connection = mysql.createConnection({
//     host    : "localhost",
//     user    : DB_USERNAME,
//     password: DB_PASSWORD,
//     database: DB,
// })

// connection.connect((err)=>{
//     if(err){
//         console.log(err)
//     }else{
//         console.log("koneksi aman")
//     }
// })

module.exports = connection