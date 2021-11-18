// untuk menghandle router table user

const express = require('express');
const{
  topUp, transfer, getIncome, getSpending, getAllTransaction, getDetailTransfer
}=require('../controller/Transctrl')
const authen = require('../middleware/authentication');

const transrouter = express.Router();
transrouter
  .get('/income', authen, getIncome)
  .get('/spending', authen, getSpending)
  .get('/mytrans/:id', getDetailTransfer)
  .get('/transaction', authen, getAllTransaction)
  .post('/topup', authen, topUp)
  .post('/transfer/:id', authen, transfer)

module.exports = transrouter;
