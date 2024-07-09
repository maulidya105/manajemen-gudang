const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const JabatanSchema = new Schema({
  nama: {
    type: String,
    required: true,
  },
});

JabatanSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;

    return {
      id: ret.id,
      jabatan: ret.nama,
    };
  },
});

const Jabatan = mongoose.model("jabatan", JabatanSchema);
module.exports = Jabatan;
