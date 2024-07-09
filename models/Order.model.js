const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  pembayaranId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  karyawanId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  barangId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  vendorId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  tanggal: {
    type: Date,
    required: true,
  },
  jumlah: {
    type: Number,
    required: true,
  },
});

OrderSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;

    return {
      pembayaran: ret.pembayaranId,
      karyawan: ret.karyawanId,
      barang: ret.barangId,
      vendor: ret.vendorId,
      tanggal: ret.tanggal,
      jumlah: ret.jumlah,
    };
  },
});

const Order = mongoose.model("order", OrderSchema);
module.exports = Order;
