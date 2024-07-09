const User = require("../models/User.model");
const createError = require("http-errors");

async function getUserInfo(req, res, next) {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) throw createError.NotFound("User not found");

    const resposne = {
      status: 200,
      message: "success",
      data: user,
    };

    res.send(response);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getUserInfo,
};
