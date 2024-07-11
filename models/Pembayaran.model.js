const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PembayaranSchema = new Schema({
  metode: {
    type: String,
    required: true,
    enum: ["Debit", "Credit"],
  },
  jumlah: {
    type: Number,
    required: true,
  },
});

PembayaranSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;

    return {
      id: ret.id,
      metode: ret.metode,
      jumlahPembayaran: ret.jumlah,
    };
  },
});

const Pembayaran = mongoose.model("pembayaran", PembayaranSchema);
module.exports = Pembayaran;
