const express = require("express");
const router = express.Router();
const { verifyAccessToken } = require("../helpers/jwt_helper");
const OrderController = require("../controllers/Order.controller");

router.get("/", verifyAccessToken, OrderController.getAllOrders);

router.get("/:id", verifyAccessToken, OrderController.getOrderById);

router.post("/", verifyAccessToken, OrderController.addOrder);

router.patch("/:id", verifyAccessToken, OrderController.editOrder);

router.delete("/:id", verifyAccessToken, OrderController.deleteOrder);

module.exports = router;
