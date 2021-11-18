const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')
const http = require('http')
const { Server } = require('socket.io')
const {Op} = require("sequelize")

const transrouter = require('./src/route/transrouter');
const usersRouter = require('./src/route/users.route');

const app  = express()
app.use(cors())
app.use(bodyparser.json())
app.use(usersRouter);
app.use(transrouter);
app.use("/uploads", express.static(__dirname + "/image/uploads"))
app.use("/helpers", express.static(__dirname + "/image/helpers"))



const PORT = 8000
app.listen(PORT, () => {
    console.log(`Service running on Port ${PORT}`);
});

module.exports = app;