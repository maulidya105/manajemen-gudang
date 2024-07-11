const createError = require("http-errors");
const Barang = require("../models/Barang.model");
const Order = require("../models/Order.model");
const Pembayaran = require("../models/Pembayaran.model");
const User = require("../models/User.model");
const Vendor = require("../models/Vendor.model");
const { addOrderSchema } = require("../helpers/validation_schema");

async function getAllOrders(req, res, next) {
  try {
    const order = await Order.find()
      .populate("pembayaranId")
      .populate("karyawanId")
      .populate("barangId")
      .populate("vendorId");

    const response = {
      status: 200,
      message: "success",
      data: order,
    };

    res.send(response);
  } catch (error) {
    next(error);
  }
}

async function getOrderById(req, res, next) {
  try {
    const { id } = req.params;

    const order = await Order.findById(id)
      .populate("pembayaranId")
      .populate("karyawanId")
      .populate("barangId")
      .populate("vendorId");

    const response = {
      status: 200,
      message: "success",
      data: order,
    };

    res.send(response);
  } catch (error) {
    next(error);
  }
}

async function addOrder(req, res, next) {
  try {
    const result = await addOrderSchema.validateAsync(req.body);

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

    const isVendorExist = await Vendor.findById(result.vendorId);
    if (!isVendorExist)
      throw createError.NotFound(
        `Vendor with Vendor ID ${result.vendorId} is Not Found`
      );

    const order = new Order(result);
    await order.save();

    const response = {
      status: 201,
      message: "added",
      data: order,
    };

    res.send(response);
  } catch (error) {
    next(error);
  }
}

async function editOrder(req, res, next) {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const order = await Order.findByIdAndUpdate(
      id,
      { $set: updateData },
      { returnOriginal: false }
    );
    if (!order)
      throw createError.NotFound(`Order with Order ID ${id} is Not Found`);

    const response = {
      status: 200,
      message: "success",
      data: order,
    };

    res.send(response);
  } catch (error) {
    next(error);
  }
}

async function deleteOrder(req, res, next) {
  try {
    const { id } = req.params;

    const order = Order.findByIdAndDelete(id);
    if (!order)
      throw createError.NotFound(`Order with Order ID ${id} is Not Found`);

    const response = {
      status: 200,
      message: "deleted",
    };
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllOrders,
  getOrderById,
  addOrder,
  editOrder,
  deleteOrder,
};
