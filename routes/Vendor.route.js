const express = require("express");
const router = express.Router();
const { verifyAccessToken } = require("../helpers/jwt_helper");
const VendorController = require("../controllers/Vendor.controller");

router.get("/", verifyAccessToken, VendorController.getAllVendor);

router.get("/:id", verifyAccessToken, VendorController.getVendorById);

router.post("/", verifyAccessToken, VendorController.addVendor);

router.patch("/:id", verifyAccessToken, VendorController.editVendor);

router.delete("/:id", verifyAccessToken, VendorController.deleteVendor);

module.exports = router;
