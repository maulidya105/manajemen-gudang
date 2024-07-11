const Joi = require("@hapi/joi");

const registerSchema = Joi.object({
  email: Joi.string().required().email().lowercase(),
  username: Joi.string().required(),
  password: Joi.string().required().min(8),
  repeatPassword: Joi.ref("password"),
  alamat: Joi.string().required(),
  telp: Joi.string().required(),
  role: Joi.string().required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const addBarangSchema = Joi.object({
  barangId: Joi.string().required(),
  harga: Joi.number().required(),
  jenis: Joi.string().required(),
  ukuran: Joi.number().required(),
  merk: Joi.string().required(),
});

const addVendorSchema = Joi.object({
  vendorId: Joi.string().required(),
  nama: Joi.string().required(),
  alamat: Joi.string().required(),
  jenis: Joi.string().required(),
  email: Joi.string().email().required(),
  telp: Joi.string().required(),
  status: Joi.string().required(),
});

const addPembayaranSchema = Joi.object({
  metode: Joi.string().required(),
  jumlah: Joi.number().required(),
});

const addOrderSchema = Joi.object({
  pembayaranId: Joi.string().required(),
  karyawanId: Joi.string().required(),
  barangId: Joi.string().required(),
  vendorId: Joi.string().required(),
  tanggal: Joi.date().required(),
  jumlah: Joi.number().required(),
});

module.exports = {
  registerSchema,
  loginSchema,
  addBarangSchema,
  addVendorSchema,
  addPembayaranSchema,
  addOrderSchema,
};
