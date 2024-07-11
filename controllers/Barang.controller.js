const createError = require("http-errors");
const Barang = require("../models/Barang.model");
const { addBarangSchema } = require("../helpers/validation_schema");

async function getAllBarang(req, res, next) {
  try {
    const barang = await Barang.find();

    const response = {
      status: 200,
      message: "success",
      data: barang,
    };

    res.send(response);
  } catch (error) {
    next(error);
  }
}

async function getBarangById(req, res, next) {
  try {
    const { id } = req.params;

    const barang = await Barang.findOne({ barangId: id });
    if (!barang)
      throw createError.NotFound(`Barang with Barang ID ${id} is Not Found`);

    const response = {
      status: 200,
      message: "success",
      data: barang,
    };

    res.send(response);
  } catch (error) {
    next(error);
  }
}

async function addBarang(req, res, next) {
  try {
    const result = await addBarangSchema.validateAsync(req.body);

    const isExist = await Barang.findOne({ barangId: result.barangId });
    if (isExist)
      throw createError.Conflict(
        `Barang with Barang ID ${result.barangId} is Already in Database`
      );

    const barang = new Barang(result);
    await barang.save();

    const response = {
      status: 201,
      message: "added",
      data: barang,
    };

    res.send(response);
  } catch (error) {
    next(error);
  }
}

async function editBarang(req, res, next) {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const barang = await Barang.findOneAndUpdate(
      { barangId: id },
      {
        $set: updateData,
      },
      { returnOriginal: false }
    );
    if (!barang)
      throw createError.NotFound(`Barang with Barang ID ${id} is Not Found`);

    const response = {
      status: 200,
      message: "updated",
      data: barang,
    };

    res.send(response);
  } catch (error) {
    next(error);
  }
}

async function deleteBarang(req, res, next) {
  try {
    const { id } = req.params;

    await Barang.findOneAndDelete({ barangId: id });

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
  getAllBarang,
  getBarangById,
  addBarang,
  editBarang,
  deleteBarang,
};
