/* eslint-disable no-shadow */
/* eslint-disable max-len */
const Porto = require('../models/expmodel');
const { success, failed } = require('../helpers/response');
const { Sequelize } = require('sequelize')
const Op = Sequelize.Op;

// table porto di dalam database coffee_shop di mysql
const expctrl = {
// menampilkan list porto
  getlist: async (req, res) => {
    try {
      const { query } = req;
      const search = query.search === undefined ? '' : query.search;
      const result = await Porto.findAll({
        where: {
          company: {
            [Op.substring]: search
          }
        }
      });
      const output = {
        data: result,
        search
      };
      success(res, output, 'get portfolio data success');
    } catch (err) {
      failed(res, 401, err);
    }
  },
  // menampilkan detail table porto berdasarkan id
  getdetail: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Porto.findAll({
        where: {
          users_id: id
        }
      });
      success(res, result, 'get portfolio details success');
    } catch (err) {
      failed(res, 401, err);
    }
  },
  // insert data porto
  insert: async (req, res) => {
    try {
      const { body } = req;
      const result = await Porto.create({
        company: body.company,
        position: body.position,
        start_work: body.start_work,
        end_work: body.end_work,
        description: body.description,
        users_id: body.users_id,
      });
      success(res, result, 'Input portfolio Data Success');
    } catch (err) {
      failed(res, 401, err);
    }
  },

  // delete data porto
  del: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Porto.destroy({
        where: {
          id: id
        }
      })
      success(res, result, 'Delete portfolio Data Success');
    } catch (err) {
      failed(res, 404, err);
    }
  },
  update: async (req, res) => {
    try {
      const { body } = req;
      const { id } = req.params;
      const result = await Porto.update(
        {
          company: body.company
        },
        {
          position: body.position
        },
        {
          start_work: body.start_work
        },
        {
          end_work: body.end_work
        },
        {
          description: body.description
        },
        {
          where: {
            id: id
          }
        }
      )
      success(res, result, 'Update portfolio Data Success');
    } catch (err) {
      failed(res, 500, err);
    }
  },
};

module.exports = expctrl;
