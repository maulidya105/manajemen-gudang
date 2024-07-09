const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MetodePembayaranSchema = new Schema({
  nama: {
    type: String,
    required: true,
  },
});

MetodePembayaranSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;

    return {
      id: ret.id,
      nama: ret.nama,
    };
  },
});

const MetodePembayaran = mongoose.model(
  "metode-pembayaran",
  MetodePembayaranSchema
);
module.exports = MetodePembayaran;
