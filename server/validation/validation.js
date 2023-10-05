const { Joi, celebrate } = require('celebrate')

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

const validateDeleteTask = celebrate({
  params: Joi.object().keys({
    _id: Joi.string()
      .pattern(/[a-f0-9]{24,24}/)
      .length(24),
  }),
})

const validateCreateTask = celebrate({
  body: Joi.object().keys({
    taskId: Joi.number().required(),
    name: Joi.string().required(),
    status: Joi.boolean().required,
  }),
})

module.exports = {
  signUpValidation,
  signInValidation,
  validateDeleteTask,
  validateCreateTask,
}
