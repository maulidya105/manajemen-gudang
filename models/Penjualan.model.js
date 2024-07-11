const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PenjualanSchema = new Schema({
  pembayaranId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "pembayaran",
  },
  barangId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "barang",
  },
  karyawanId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  total: {
    type: Number,
    required: true,
  },
  tanggal: {
    type: Date,
    required: true,
  },
});

PenjualanSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;

    return {
      id: ret.id,
      pembayaran: ret.pembayaranId,
      barang: ret.barangId,
      karyawan: ret.karyawanId,
      total: ret.total,
      tanggal: ret.tanggal,
    };
  },
});

const Penjualan = mongoose.model("penjualan", PenjualanSchema);
module.exports = Penjualan;
