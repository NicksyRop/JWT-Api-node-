const router = require("express").Router();

const verify = require("./verifyToken");

const Order = require("../model/Order");

router.get("/", verify, (req, res) => {
  return res.send("nice one");
});

module.exports = router;
