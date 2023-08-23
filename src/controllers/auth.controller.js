const User = require("../models/user.model");
const emailService = require("../services/email.service");

const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
//REGISTER
const register = async (req, res) => {
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
    console.log("User registered:", savedUser.username);
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
};
//LOGIN
const login = async (req, res) => {
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
    console.log("User logged in:", user.username);
    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    console.log("Error during login:", err);
    res.status(500).json(err);
  }
};
//send email
const sendEmail = async (req, res) => {
    try {
      const { email, subject, content } = req.body;
      if (!email || !subject || !content) throw new Error('Please provide email, subject and content!');
      
      await emailService.sendEmail(email, subject, content);
      res.status(200).json({ message: 'Email sent successfully.' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ errors: error.message });
    }
  };

module.exports = {
  register,
  login,
  sendEmail,
};