const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BarangSchema = new Schema({
  barangId: {
    type: String,
    required: true,
    unique: true,
  },
  harga: {
    type: Number,
    required: true,
  },
  jenis: {
    type: String,
    required: true,
  },
  ukuran: {
    type: Number,
    required: true,
  },
  merk: {
    type: String,
    required: true,
  },
});

BarangSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;

    return {
      barangId: ret.barangId,
      harga: ret.harga,
      jenis: ret.jenis,
      ukuran: ret.ukuran,
      merk: ret.merk,
    };
  },
});

const Barang = mongoose.model("barang", BarangSchema);
module.exports = Barang;
