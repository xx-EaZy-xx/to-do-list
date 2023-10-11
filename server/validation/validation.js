const { Joi, celebrate } = require('celebrate')

const uuidPattern =
  /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/

const maxSymbols = 100

const signUpValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
})

const signInValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
})

const postTaskValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().max(maxSymbols),
    date: Joi.string().required().max(maxSymbols),
    partialDate: Joi.string().required().max(maxSymbols),
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
