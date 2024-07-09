const Joi = require("@hapi/joi");

const registerSchema = Joi.object({
  email: Joi.string().required().email().lowercase(),
  username: Joi.string().required(),
  password: Joi.string().required().min(8),
  repeatPassword: Joi.ref("password"),
  alamat: Joi.string().required(),
  telp: Joi.string().required(),
  role: Joi.string().required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports = { registerSchema, loginSchema };
