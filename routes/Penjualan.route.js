const express = require("express");
const router = express.Router();
const PenjualanController = require("../controllers/Penjualan.controller");
const { verifyAccessToken } = require("../helpers/jwt_helper");

router.get("/", verifyAccessToken, PenjualanController.getAllPenjualan);

router.get("/:id", verifyAccessToken, PenjualanController.getPenjualanById);

router.post("/", verifyAccessToken, PenjualanController.addPenjualan);

router.patch("/:id", verifyAccessToken, PenjualanController.editPenjualan);

router.delete("/:id", verifyAccessToken, PenjualanController.deletePenjualan);

module.exports = router;
