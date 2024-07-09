const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PembayaranSchema = new Schema({
  metodeId: {
    type: Schema.Types.ObjectId,
    required: true,
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
      metode: ret.metodeId,
      jumlahPembayaran: ret.jumlah,
    };
  },
});
