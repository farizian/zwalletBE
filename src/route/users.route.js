const express = require('express');
const authen = require('../middleware/authentication');
// const upload = require('../middleware/upload');


const { 
    getAll, 
    register,
    update,
    deleteUser, 
    getDetail,
    login,
} = require('../controller/users.controller');

const usersRouter = express.Router();

usersRouter
.get('/users', authen, getAll)
.get('/user/:id',authen, getDetail)
.post('/register', register)
.post('/login', login)
.put('/user/:id',authen, update)
.delete('/user/:id', authen, deleteUser)

module.exports = usersRouter;