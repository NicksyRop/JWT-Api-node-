const router = require("express").Router();

const User = require("../model/User");

const { body, check, validationResult } = require("express-validator");

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
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      confirm_password: req.body.confirm_password,
    });

    try {
      const savedUser = await user.save();
      res.send(savedUser);
    } catch (error) {
      res.status(400).send(error);
    }
  }
);

router.post("/login", (req, res) => {
  res.send("Login");
});
module.exports = router;
