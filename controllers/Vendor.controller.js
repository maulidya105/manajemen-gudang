const createError = require("http-errors");
const Vendor = require("../models/Vendor.model");
const { addVendorSchema } = require("../helpers/validation_schema");

async function getAllVendor(req, res, next) {
  try {
    const vendor = await Vendor.find();

    const response = {
      status: 200,
      message: "success",
      data: vendor,
    };

    res.send(response);
  } catch (error) {
    next(error);
  }
}

async function getVendorById(req, res, next) {
  try {
    const { id } = req.params;

    const vendor = await Vendor.findOne({ vendorId: id });
    if (!vendor)
      throw createError.NotFound(`Vendor with Vendor ID ${id} is Not Found`);

    const response = {
      status: 200,
      message: "success",
      data: vendor,
    };

    res.send(response);
  } catch (error) {
    next(error);
  }
}

async function addVendor(req, res, next) {
  try {
    const result = await addVendorSchema.validateAsync(req.body);

    const isExist = await Vendor.findOne({ vendorId: result.vendorId });
    if (isExist)
      throw createError.Conflict(
        `Vendor with Vendor ID ${result.vendorId} is Already Exist in Database`
      );

    const vendor = new Vendor(result);
    await vendor.save();

    const response = {
      status: 201,
      message: "added",
      data: vendor,
    };

    res.send(response);
  } catch (error) {
    next(error);
  }
}

async function editVendor(req, res, next) {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const vendor = await Vendor.findOneAndUpdate(
      { vendorId: id },
      { $set: updateData },
      { returnOriginal: false }
    );
    if (!vendor)
      throw createError.NotFound(`Vendor with Vendor ID ${id} is Not Found`);

    const response = {
      status: 200,
      message: "success",
      data: vendor,
    };

    res.send(response);
  } catch (error) {
    next(error);
  }
}

async function deleteVendor(req, res, next) {
  try {
    const { id } = req.params;

    const isExist = await Vendor.findOne({ vendorId: id });
    if (!isExist)
      throw createError.NotFound(`Vendor with Vendor ID ${id} is Not Found`);

    await Vendor.findOneAndDelete({ vendorId: id });

    const response = {
      status: 200,
      message: "deleted",
    };

    res.send(response);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllVendor,
  getVendorById,
  addVendor,
  editVendor,
  deleteVendor,
};
