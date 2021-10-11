// untuk menghandle router table user

const express = require('express');
const portoctrl = require('../controllers/portoctrl');
// const midAuth = require('../middleware/authentication');

const portorouter = express.Router();
portorouter
  .get('/portfolio', portoctrl.getlist)
  .get('/portfolio/:id', portoctrl.getdetail)
  .post('/portfolio', portoctrl.insert)
  .delete('/portfolio/:id', portoctrl.del)
  .put('/portfolio/:id', portoctrl.update);

module.exports = portorouter;
