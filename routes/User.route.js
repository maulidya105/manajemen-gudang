const express = require("express");
const router = express.Router();
const { verifyAccessToken } = require("../helpers/jwt_helper");
const UserController = require("../controllers/User.controller");

router.get("/:id", verifyAccessToken, UserController.getUserInfo);

module.exports = router;
