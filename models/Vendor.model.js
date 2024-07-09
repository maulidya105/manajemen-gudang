const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VendorSchema = new Schema({
  vendorId: {
    type: String,
    required: true,
    unique: true,
  },
  nama: {
    type: String,
    required: true,
  },
  alamat: {
    type: String,
    required: true,
  },
  jenis: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  telp: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

VendorSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;

    return {
      vendorId: ret.vendorId,
      nama: ret.nama,
      alamat: ret.alamat,
      jenis: ret.jenis,
      email: ret.email,
      telp: ret.telp,
      status: ret.status,
    };
  },
});

const Vendor = mongoose.model("vendor", VendorSchema);
module.exports = Vendor;
