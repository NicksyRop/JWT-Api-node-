const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
//import routes
const authRoutes = require("./routes/auth");
const orderRoutes = require("./routes/orders");
const mpesaRoures = require("./routes/mpesa");

dotenv.config();
//DB
mongoose.connect(process.env.DB_CONNECT, () => console.log("Connected to DB"));

//middlewares
app.use(cors());
app.use(express.json());

//middleware

app.use("/api/users", authRoutes);
app.use("/orders", orderRoutes);
app.use("/mpesa", mpesaRoures);

app.get("/", (req, res) => {
  res.send("Welcome to Node js JWT authentication API");
});

app.get("/health", (req, res) => {
  res.send("ok");
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, console.log("serever running on port 5000"));
