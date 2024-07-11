const express = require("express");
const router = express.Router();
const PembayaranController = require("../controllers/Pembayaran.controller");
const { verifyAccessToken } = require("../helpers/jwt_helper");

router.get("/", verifyAccessToken, PembayaranController.getAllPembayaran);

router.get("/:id", verifyAccessToken, PembayaranController.getPembayaranById);

router.post("/", verifyAccessToken, PembayaranController.addPembayaran);

router.patch("/:id", verifyAccessToken, PembayaranController.editPembayaran);

router.delete("/:id", verifyAccessToken, PembayaranController.deletePembayaran);

module.exports = router;
