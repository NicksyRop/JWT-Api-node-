const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
//import routes
const authRoutes = require("./routes/auth");
const orderRoutes = require("./routes/orders");

dotenv.config();
//DB
mongoose.connect(process.env.DB_CONNECT, () => console.log("Connected to DB"));

//middlewares
app.use(express.json());

//middleware

app.use("/api/users", authRoutes);
app.use("/orders", orderRoutes);
app.listen(5000, console.log("serever running on port 5000"));
