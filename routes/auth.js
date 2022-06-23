const router = require("express").Router();

const User = require("../model/User");

const { body, check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

router.post(
  "/register",
  check("password")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 chars long"),
  check("email").isEmail().withMessage("Email is invalid"),

  check("email")
    .isEmail({ min: 5 })
    .withMessage("must be at least 5 chars long"),

  body("confirm_password").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Password confirmation does not match password");
    }
    return true;
  }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const emaiExist = await User.findOne({ email: req.body.email });
    if (emaiExist) {
      res.status(400).json("Email already in use");
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(req.body.password, salt);
    const hashConfirm = bcrypt.hashSync(req.body.confirm_password, salt);

    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashPass,
      confirm_password: hashConfirm,
    });

    try {
      const savedUser = await user.save();
      res.send(savedUser);
    } catch (error) {
      res.status(400).send(error);
    }
  }
);

router.post(
  "/login",
  check("password")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 chars long"),
  check("email").isEmail().withMessage("Email is invalid"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json("failure", { errors: errors.array() });
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(400).json("failure", { error: "Email or Password is wrong" });
    }

    const match = await bcrypt.compare(req.body.password, user.password);

    if (!match) {
      res.status(400).json("failure", { error: "Email or Password is wrong" });
    }
    //create token
    var token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
      expiresIn: "48h",
    });

    res
      .status(200)
      .header("auth-token", token)
      .json({ user_id: user._id, auth_token: token });
  }
);
module.exports = router;
