const createError = require("http-errors");
const Barang = require("../models/Barang.model");
const Pembayaran = require("../models/Pembayaran.model");
const User = require("../models/User.model");
const Penjualan = require("../models/Penjualan.model");
const { addPenjualanSchema } = require("../helpers/validation_schema");

async function getAllPenjualan(req, res, next) {
  try {
    const penjualan = await Penjualan.find()
      .populate("pembayaranId")
      .populate("karyawanId")
      .populate("barangId");

    const response = {
      status: 200,
      message: "success",
      data: penjualan,
    };

    res.send(response);
  } catch (error) {
    next(error);
  }
}

async function getPenjualanById(req, res, next) {
  try {
    const { id } = req.params;

    const penjualan = await Penjualan.findById(id)
      .populate("pembayaranId")
      .populate("karyawanId")
      .populate("barangId");

    const response = {
      status: 200,
      messsage: "success",
      data: penjualan,
    };

    res.send(response);
  } catch (error) {
    next(error);
  }
}

async function addPenjualan(req, res, next) {
  try {
    const result = await addPenjualanSchema.validateAsync(req.body);

    const isBarangExist = await Barang.findById(result.barangId);
    if (!isBarangExist)
      throw createError.NotFound(
        `Barang with Barang ID ${result.barangId} is Not Found`
      );

    const isPembayaranExist = await Pembayaran.findById(result.pembayaranId);
    if (!isPembayaranExist)
      throw createError.NotFound(
        `Pembayaran with Pembayaran ID ${result.pembayaranId} is Not Found`
      );

    const isKaryawanExist = await User.findById(result.karyawanId);
    if (!isKaryawanExist)
      throw createError.NotFound(
        `Karyawan with User ID ${result.karyawanId} is Not Found`
      );
    if (isKaryawanExist && isKaryawanExist.role !== "Cashier")
      throw createError.Unauthorized(
        `Karyawan with Karyawan ID ${result.karyawanId} is Not Authorized`
      );

    const penjualan = new Penjualan(result);
    await penjualan.save();

    const response = {
      status: 201,
      message: "added",
      data: penjualan,
    };

    res.send(response);
  } catch (error) {
    next(error);
  }
}

async function editPenjualan(req, res, next) {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const penjualan = await Penjualan.findByIdAndUpdate(
      id,
      { $set: updateData },
      { returnOriginal: false }
    );
    if (!penjualan)
      throw createError.NotFound(
        `Penjualan with Penjualan ID ${id} is Not Found`
      );

    const response = {
      status: 200,
      message: "success",
      data: penjualan,
    };

    res.send(response);
  } catch (error) {
    next(error);
  }
}

async function deletePenjualan(req, res, next) {
  try {
    const { id } = req.params;

    const penjualan = await Penjualan.findByIdAndDelete(id);
    if (!penjualan)
      throw createError.NotFound(
        `Penjualan with Penjualan ID ${id} is Not Found`
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
  getAllPenjualan,
  getPenjualanById,
  addPenjualan,
  editPenjualan,
  deletePenjualan,
};
