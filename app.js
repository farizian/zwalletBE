const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')
const http = require('http')
const { Server } = require('socket.io')
const skill = require('./src/routers/skillrouter')

const app  = express()
app.use(cors())
app.use(bodyparser.json())
app.use(skill)
app.use("/uploads", express.static(__dirname + "/image/uploads"))
app.use("/helpers", express.static(__dirname + "/image/helpers"))


const httpServer = http.createServer(app)

const io = new Server(httpServer, {
    cors: {
        origin: "*",
    },
});

const PORT = 2021
httpServer.listen(PORT, () => {
    console.log(`Service running on Port ${PORT}`);
});

module.exports = app;