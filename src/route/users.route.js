const express = require('express');
const authen = require('../middleware/authentication');
const upload = require('../middleware/upload');


const { 
    getAll, 
    register,
    updatePw,
    updateUser,
    updatePin,
    deleteUser, 
    getDetail,
    myDetail,
    checkpin,
    login,
    forgetPassword,
} = require('../controller/users.controller');

const usersRouter = express.Router();

usersRouter
.get('/users', authen, getAll)
.get('/user/:id', getDetail)
.get('/mydetail',authen, myDetail)
.post('/register', register)
.post('/login', login)
.post('/checkpin', authen, checkpin)
.put('/userpw', authen, updatePw)
.put('/userpin/:id', updatePin)
.put('/user', authen, upload, updateUser)
.delete('/user/:id', authen, deleteUser)
.post('/forget-pass', forgetPassword)

module.exports = usersRouter;