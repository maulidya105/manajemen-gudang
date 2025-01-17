const express = require("express");
const morgan = require("morgan");
const http = require("http");
const cors = require("cors");
const createError = require("http-errors");
require("dotenv").config();
require("./helpers/init_mongodb");
const AuthRoute = require("./routes/Auth.route");
const UserRoute = require("./routes/User.route");
const BarangRoute = require("./routes/Barang.route");
const VendorRoute = require("./routes/Vendor.route");
const PembayaranRoute = require("./routes/Pembayaran.route");
const OrderRoute = require("./routes/Order.route");
const PenjualanRoute = require("./routes/Penjualan.route");

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOpts = {
  origin: "*",

  methods: ["GET", "POST", "PATCH", "DELETE"],

  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOpts));
app.options("*", cors(corsOpts));

app.get("/", async (req, res, next) => {
  res.send("Hello, it's backend for manajemen gudang website by maulidya ika");
});

app.use("/auth", AuthRoute);
app.use("/user", UserRoute);
app.use("/barang", BarangRoute);
app.use("/vendor", VendorRoute);
app.use("/pembayaran", PembayaranRoute);
app.use("/order", OrderRoute);
app.use("/penjualan", PenjualanRoute);

app.use(async (req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

const server = http.createServer(app);

server.setTimeout(6000, (socket) => {
  console.log("Request has timed out");
  socket.end("Request has timed out");
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
