const { signAccessToken } = require("../helpers/jwt_helper");
const { registerSchema, loginSchema } = require("../helpers/validation_schema");
const User = require("../models/User.model");

async function register(req, res, next) {
  try {
    const result = await registerSchema.validateAsync(req.body);

    const doesExist = await User.findOne({ email: result.email });
    if (doesExist)
      throw createError.Conflict(`${result.email} is already been registered.`);

    const user = new User(result);
    await user.save();

    const response = {
      status: 201,
      message: "registered",
    };

    res.send(response);
  } catch (error) {
    if (error.isJoi === true) error.status = 422;
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const result = await loginSchema.validateAsync(req.body);
    const user = await User.findOne({ email: result.email });
    if (!user) throw createError.NotFound("User not registered");

    const isMatch = await user.isValidPassword(result.password);
    if (!isMatch)
      throw createError.Unauthorized("Either Email / Password is Incorrect");

    const accessToken = await signAccessToken(user.id);

    const response = {
      status: 200,
      message: "success",
      data: {
        email: user.email,
        nim: user.nim,
        token: accessToken,
      },
    };

    res.send(response);
  } catch (error) {
    if (error.isJoi === true)
      return next(createError.BadRequest("Invalid Email / Password"));

    next(error);
  }
}

module.exports = {
  register,
  login,
};
