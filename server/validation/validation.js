const { Joi, celebrate } = require('celebrate')

const uuidPattern =
  /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/

const maxSymbols = 100

//Валидация пользователей
const signUpValidation = celebrate({
  body: Joi.object().keys({
    login: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(2).max(30),
    secondPassword: Joi.string().required().min(2).max(30),
  }),
})

const signInValidation = celebrate({
  body: Joi.object().keys({
    login: Joi.string().required(),
    password: Joi.string().required().min(2).max(30),
  }),
})

//Валидация задач
const postTaskValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().max(maxSymbols),
    date: Joi.string().required().max(maxSymbols),
    partialDate: Joi.string().required().max(maxSymbols),
    userId: Joi.string().required(),
  }),
})

const deleteTaskValidation = celebrate({
  body: Joi.object().keys({
    id: Joi.string().pattern(uuidPattern),
  }),
})

const patchTaskValidation = celebrate({
  body: Joi.object().keys({
    id: Joi.string().required().max(maxSymbols),
    name: Joi.string().max(maxSymbols),
  }),
})

module.exports = {
  signUpValidation,
  signInValidation,
  postTaskValidation,
  deleteTaskValidation,
  patchTaskValidation,
}
