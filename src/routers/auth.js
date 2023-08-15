const router = require("express").Router();
const User = require("../models/user.model");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//REGISTER
router.post("/register", async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    const existingUser = await User.findOne({
      $or: [{ username: username }, { email: email }],
    });
    if (existingUser) {
      return res.status(400).json("Username or email already exists");
    }
    const newUser = new User({
      username,
      email,
      password: CryptoJS.AES.encrypt(password, process.env.PASS_SEC).toString(),
      role: role || "user",
    });
    if (role === "admin") {
      newUser.role = "admin";
    }
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});
//LOGIN
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
    });
    if (!user) {
      return res.status(401).json("Wrong User Name");
    }
    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    const inputPassword = req.body.password;
    if (originalPassword !== inputPassword) {
      return res.status(401).json("Wrong Password");
    }
    const accessToken = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SEC,
      { expiresIn: "15d" }
    );
    const { password, ...others } = user._doc;
    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    console.log("Error during login:", err);

    res.status(500).json(err);
  }
});


module.exports = router;