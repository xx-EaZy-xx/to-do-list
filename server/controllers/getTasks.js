const { Task } = require('../models')
const { Op } = require('sequelize')
const createError = require('http-errors')

const getAllTasks = async (req, res, next) => {
  try {
    const pageSize = 7
    const offset = (req.query.page - 1) * pageSize
    const limit = pageSize
    const { filter, sortVector, today } = req.query
    const { where, order } = {
      where: {
        isDone:
          filter === 'All'
            ? [true, false]
            : filter === 'Done' && filter !== 'Undone'
            ? true
            : false,
        partialDate: {
          [Op.substring]:
            today === 'today' ? new Date().toLocaleString().slice(0, 10) : '',
        },
      },
      order: [
        [
          'createdAt',
          `${sortVector === 'ASC' && sortVector !== 'DESC' ? 'ASC' : 'DESC'}`,
        ],
      ],
    }
    const tasks = await Task.findAll({
      where,
      order,
      offset,
      limit,
    })
    const total = await Task.findAll({
      where,
      order,
    })
    return res.status(200).json({ tasks, total })
  } catch (err) {
    console.log(err)
    return next(createError(404, 'Задачи не были найдены'))
  }
}
module.exports = {
  getAllTasks,
}
