const {DB, HOST, DB_USERNAME, DB_PASSWORD} = require("../helpers/env")
const {Sequelize} = require("sequelize")

const db = new Sequelize (DB, DB_USERNAME, DB_PASSWORD, {
    host : HOST,
    dialect : "mysql",
})

db.authenticate()
    .then(()=>{
        console.log("koneksi aman")
    })
    .catch((err)=>{
        console.log(err)
    })

module.exports = db
