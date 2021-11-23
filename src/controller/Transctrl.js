const transactionModels = require("../models/transactionModel")
const usersModels = require("../models/usersModel");
const { Sequelize } = require("sequelize")
const bcrypt = require("bcrypt");
const { success, failed } = require("../helpers/response");
const Op = Sequelize.Op;

const transaction = {
    topUp : async(req, res) =>{
      try {
        const { body } = req;
        const id = req.userId;
        const getUSER= await usersModels.findAll({
          where: {
            id,
          },
        });
        const saldo = getUSER[0].balance

        const transaction = await transactionModels.create({
          amount : body.amount,
          balance: saldo + body.amount,
          notes: "Top Up",
          description: body.description,
          iduser: id,
          sender: id,
          receiver: id
        })
        const update = await usersModels.update(
          {
            balance : saldo + body.amount
          },
          { where: { id } }
        );
        success(res, transaction, "Top Up Success");

      } catch (error) {
        failed(res.status(401), 401, error)
      }
    },
    transfer: async(req, res) =>{
      try {
        const { body } = req;
        const id = req.userId;
        const idReceiver = req.params.id;
        const sender = await usersModels.findAll({
          where: {
            id,
          },
        });
        const receiver = await usersModels.findAll({
          where: {
            id: idReceiver,
          },
        });
        const saldo = sender[0].balance;
        const saldoReceiver = receiver[0].balance
        console.log(saldoReceiver)

        if(saldo < body.amount){
          failed(res.status(404), 404, "saldo tidak mencukupi")
        }else{
          const transaction = await transactionModels.create({
            amount : body.amount,
            balance: saldo - body.amount,
            notes: "Transfer",
            description: body.description,
            iduser: id,
            sender: id,
            receiver: idReceiver,
          })
          const transactionReceiver = await transactionModels.create({
            amount : body.amount,
            balance: saldoReceiver + body.amount,
            notes: "Accept",
            description: `Accept From ${sender[0].firstname} ${sender[0].lastname}`,
            iduser: idReceiver,
            sender: id,
            receiver: idReceiver,
          })
          const update = await usersModels.update(
            {
              balance: saldo - body.amount,
            },
            { where: { id } }
          );
          const updateReceiver = await usersModels.update(
            {
              balance: saldoReceiver + body.amount,
            },
            { where: { id : idReceiver } }
          );
          success(res, transaction, "Transfer Success");
        }
      } catch (error) {
          failed(res.status(401), 401, error);
      }
    },
    getIncome: async(req, res) =>{
      try {
        const id = req.userId;
        const result = await transactionModels.findAll({
          where: {
            iduser: id,
            receiver: id
          },
          order: [
            ['created_at', 'ASC']
          ],
        });
        success(res, result, "get Income Success")
      } catch (error) {
        failed(res.status(401), 401, error);
      }
    },
    getSpending: async(req, res)=>{
      try {
        const id = req.userId;
        const result = await transactionModels.findAll({
          where: {
            iduser: id,
            sender: id,
            notes: "Transfer"
          },
          order: [
            ['created_at', 'ASC']
          ],
        });
        success(res, result, "get Spending Success ");
      } catch (error) {
        failed(res.status(401), 401, error);
      }
    },
    getDetailTransfer: async(req, res)=>{
      try {
        const id = req.params.id;
        const result = await transactionModels.findAll({
          where: {
            id
          },
          include: [
            {model: usersModels, as: 'receiverUsers'}
          ]
        });
        success(res, result, "get detailTrans Success ");
      } catch (error) {
        failed(res.status(401), 401, error);
      }
    },
    getAllTransaction: async(req, res) =>{
      try {
        const iduser = req.userId;
        const result = await transactionModels.findAll({
          where: {
            iduser
            // [Op.or] : [{sender: id}, {receiver: id}]
          },
          include: [
            {model: usersModels, as: 'senderUsers'},
            {model: usersModels, as: 'receiverUsers'}
          ],
          order: [
            ['created_at', 'DESC']
          ],
        });
        success(res, result, "get all transaction success");
      } catch (error) {
        console.log(error)
        failed(res.status(401), 401, error);
      }
    }
}
module.exports = transaction;
