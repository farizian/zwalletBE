const usersModels = require("../models/usersModel");
const { Sequelize } = require("sequelize");
const bcrypt = require("bcrypt");
const fs = require("fs");
const { success, failed } = require("../helpers/response");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../helpers/env");
const Trans = require("../models/transactionModel");
const Op = Sequelize.Op;
const sendEmail = require("../helpers/mail")

const users = {
  getAll : async (req, res) =>{
    try {
        const { query } = req;
        const idUser = req.userId; 
        const search = query.search === undefined ? "" : query.search;
        const field = query.field === undefined ? "id" : query.field;
        const typeSort = query.sort === undefined ? "" : query.sort;
        const limit = query.limit === undefined ? 10 : parseInt(query.limit);
        const page = query.page === undefined ? 1 : query.page;
        const offset = page === 1 ? 0 : (page - 1) * limit;
        const result = await usersModels.findAll({
            where: {
                firstName: {
                    [Op.like]: `%${search}%`,
                },
                    
                },
            offset,
            limit,
            field,
            typeSort,
            })
            const data = result.filter((e)=> {
                if(e.id !== idUser){
                    return(e)
                }
            })
            // console.log(data)
        success(res, data, 'Get All Users Success');
    } catch (error) {
        failed(res.json(401), 401, error);
    }
  },
  myDetail : async(req, res) =>{
    try {
        const id = req.userId;
        const result = await usersModels.findAll({
            where: {
            id,
            },
        });
        success(res, result[0], "Get Details Users Success");
    } catch (error) {
        failed(res.status(401), 401, error);
    }
  },
  getDetail: async (req, res) => {
    try {
      const id = req.params.id;
      const result = await usersModels.findAll({
        where: {
          id,
        },
      });
      success(res, result, "Get Details Users Success");
    } catch (error) {
      failed(res, 404, error);
    }
  },
  login: async (req, res) => {
    try {
      const { body } = req;
      const email = req.body.email;
      const cekEmail = await usersModels.findAll({
        where: {
          email,
        },
      });
      if (cekEmail.length <= 0) {
        failed(res.status(404), 404, "Email not Exist");
      } else {
        const passwordHash = cekEmail[0].password;
        bcrypt.compare(body.password, passwordHash, (error, checkpassword) => {
          if (error) {
            res.json(error);
          } else if (checkpassword === true) {
            const user = cekEmail[0];
            const payload = {
              id: user.id,
            };
            const output = {
              user,
              token: jwt.sign(payload, JWT_SECRET),
            };
            success(res, output, "Login Success");
          } else {
            failed(res.status(404), 404, "Wrong Password");
          }
        });
      }
    } catch (error) {
      failed(res, 500, error);
    }
  },
  checkpin: async (req, res) => {
    try {
      const { body } = req;
      const id = req.userId;
      const cekPin = await usersModels.findAll({
        where: {
          id,
        },
      });
      const pinHash = cekPin[0].pin;
      bcrypt.compare(body.pin, pinHash, (error, checkpin) => {
        if (error) {
          res.json(error);
        } else if (checkpin === true) {
          const user = cekPin[0];
          const output = {
            user,
          };
          success(res, output, "insert Pin Success");
        } else {
          failed(res.status(404), 404, "Wrong Pin");
        }
      });
    } catch (error) {
      failed(res.status(500), 500, error);
    }
  },
  register: async (req, res) => {
    try {
      const { body } = req;
      const hash = bcrypt.hashSync(body.password, 10);
      const email = req.body.email;
      const cekEmail = await usersModels.findAll({
        where: {
          email,
        },
      });
      if (cekEmail.length <= 0) {
        const result = await usersModels.create({
          firstname: body.firstname,
          lastname: body.lastname,
          email: body.email,
          password: hash,
          phone: body.phone,
          balance: 0,
          image: "default.png",
        });
        success(res, result, "Register Success");
      } else {
        failed(res.status(401), 401, "Email already exist");
      }
    } catch (error) {
      failed(res, 500, error);
    }
  },
  updatePw: async (req, res) => {
    try {
      const {
        oldpassword,
        password,
      } = req.body;
      const id = req.userId;
      const cekPw = await usersModels.findAll({
        where: {
          id,
        },
      });
      const pwHash = cekPw[0].password;
      bcrypt.compare(oldpassword, pwHash, async(error, checkpw) => {
        if (error) {
          res.json(error);
        } else if (checkpw === true) {
          const hash = bcrypt.hashSync(password, 10);
          const result = await usersModels.update(
            {
              password: hash,
            },
            {
              where: {
                id,
              },
            });
          success(res, result, "Update Password Success");
        } else {
          failed(res.status(404), 404, "Wrong Password");
        }
      });
    } catch (error) {
      failed(res, 500, error);
    }
  },
  regisPin: async (req, res) => {
    try {
      const {
        pin
      } = req.body;
      const id = req.params.id;
      const hash = bcrypt.hashSync(pin, 10);
      const result = await usersModels.update(
        {
          pin: hash,
        },
        {
          where: {
            id,
          },
        });
      success(res, result, "Register pin Success");
    } catch (error) {
      failed(res, 500, error);
    }
  },
  updatePin: async (req, res) => {
    try {
      const { pin } = req.body;
      const id = req.userId;
      const hash = bcrypt.hashSync(pin, 10);
      const result = await usersModels.update(
        {
          pin: hash,
        },
        {
          where: {
            id,
          },
        });
      success(res, result, "Update pin Success");
    } catch (error) {
      failed(res, 500, error);
    }
  },
  updateUser: async (req, res) => {
    try {
      const {
        firstname,
        lastname,
        email,
        phone,
        description,
      } = req.body;
      
      const id = req.userId;
      const Detail = await usersModels.findAll({
        where: {
          id,
        },
      });
      const result = await usersModels.update(
        {
          firstname,
          lastname,
          email,
          phone,
          image: req.file ? req.file.filename : "default.png",
          description,
        },
        {
          where: {
            id,
          },
        });
      if (Detail[0].image === "default.png") {
        success(res, result, "Update Data Success");
      } else {
        fs.unlink(`./image/uploads/${Detail[0].image}`, (err) => {
          if (err) {
            failed(res.status(500), 500, err);
          } else {
            success(res, result, "Update Data Success");
          }
        });
      }
    } catch (error) {
      failed(res, 500, error);
    }
  },
  deleteUser: async (req, res) => {
    try {
      const id = req.params.id;
      const result = await usersModels.destroy({
        where: {
          id,
        },
      });
      const output = {
        deleteId: result,
      };
      success(res, output, "Delete Data User Success");
    } catch (error) {
      failed(res, 500, error);
    }
  },
  forgetPassword: async(req, res) =>{
    try {
      const { body } = req;
      const email = req.body.email;
      const cekEmail = await usersModels.findAll({
        where: {
          email,
        },
      });
      if (cekEmail.length <= 0) {
        failed(res.status(404), 404, "Email not Exist");
      } else {
        const user = cekEmail[0];
        const payload = {
          id: user.id,
        };
        const output = {
          user,
          token: jwt.sign(payload, JWT_SECRET),
        };
        sendEmail(user, output)
        .then((result)=>{
          success(res, 200, result)
        }).catch((error)=>{
          failed(res.status(401), 401, error)
        })
      }
    } catch (error) {
      failed(res.status(500), 500, error);
    }
  },
};

module.exports = users;
