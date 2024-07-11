const createError = require("http-errors");
const Pembayaran = require("../models/Pembayaran.model");
const { addPembayaranSchema } = require("../helpers/validation_schema");

async function getAllPembayaran(req, res, next) {
  try {
    const pembayaran = await Pembayaran.find();

    const response = {
      status: 200,
      message: "success",
      data: pembayaran,
    };

    res.send(response);
  } catch (error) {
    next(error);
  }
}

async function getPembayaranById(req, res, next) {
  try {
    const { id } = req.params;

    const pembayaran = await Pembayaran.findById(id);
    if (!pembayaran)
      throw createError.NotFound(
        `Pembarayan with Pembayaran ID ${id} is Not Found`
      );

    const response = {
      status: 200,
      message: "success",
      data: pembayaran,
    };

    res.send(response);
  } catch (error) {
    next(error);
  }
}

async function addPembayaran(req, res, next) {
  try {
    const result = await addPembayaranSchema.validateAsync(req.body);

    const pembayaran = new Pembayaran(result);
    await pembayaran.save();

    const response = {
      status: 201,
      message: "added",
      data: pembayaran,
    };

    res.send(response);
  } catch (error) {
    next(error);
  }
}

async function editPembayaran(req, res, next) {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const pembayaran = await Pembayaran.findByIdAndUpdate(
      id,
      { $set: updateData },
      { returnOriginal: false }
    );
    if (!pembayaran)
      throw createError.NotFound(
        `Pembayarang with Pembayaran ID ${id} is Not Found`
      );

    const response = {
      status: 200,
      message: "success",
      data: pembayaran,
    };

    res.send(response);
  } catch (error) {
    next(error);
  }
}

async function deletePembayaran(req, res, next) {
  try {
    const { id } = req.params;

    const pembayaran = await Pembayaran.findByIdAndDelete(id);
    if (!pembayaran)
      throw createError.NotFound(
        `Pembayaran with Pembayaran ID ${id} is Not Found`
      );

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
  addPembayaran,
  getAllPembayaran,
  getPembayaranById,
  editPembayaran,
  deletePembayaran,
};
