const User = require("../models/user.model");
const emailService = require("../services/email.service");
const crypto = require("crypto");
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

    //res.redirect("/api/auth/login?registrationSuccess=true");
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
    const encryptedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    const originalPassword = encryptedPassword.toString(CryptoJS.enc.Utf8);
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
    // Save token to cookie
    res.cookie("access_token", accessToken, {
      httpOnly: true,
      maxAge: 15 * 24 * 60 * 60 * 1000,
    });
    const { password, ...others } = user._doc;
    console.log("User logged in:", user.username);
    res.status(200).json({ ...others, accessToken });
    //res.redirect("/api/auth/home");
  } catch (err) {
    console.log("Error during login:", err);
    res.status(500).json(err);
  }
};


//send email
const sendEmail = async (req, res) => {
  try {
    const { email, subject, content } = req.body;
    if (!email || !subject || !content) throw new Error("Please provide email, subject and content!");
    await emailService.sendEmail(email, subject, content);
    res.status(200).json({ message: "Email sent successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: error.message });
  }
};
// forgot password 
const generateResetToken = () => {
  const resetToken = crypto.randomBytes(20).toString("hex");
  return resetToken;
};
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const resetToken = generateResetToken();
    // save resetToken on db
    const updatedUser = await User.findOneAndUpdate(
      { email: email },
      {
        resetToken: resetToken,
        resetTokenExpiration: Date.now() + 3600000,
      }
    );
    // send email contain resetToken to user
    await emailService.sendPasswordResetEmail(email, resetToken);
    res.status(200).json({ message: "Password reset email sent successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "an error occurred" })
  }
};
const validateResetToken = async (email, token) => {
  try {
    const user = await User.findOne({ email: email, resetToken: token });
    if (user) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error validating reset token:", error);
    return false;
  }
};
// reset password
const resetPassword = async (req, res) => {
  try {
    const { email, resetToken, newPassword } = req.body;
    // check token
    const isValidToken = await validateResetToken(email, resetToken);
    if (!isValidToken) {
      return res.status(400).json("invalid reset token");
    }
    // find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json("User not found");
    }
    // update new password
    const encryptedPassword = CryptoJS.AES.encrypt(newPassword, process.env.PASS_SEC).toString();
    user.password = encryptedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;
    await user.save();
    res.status(200).json({ message: "password reset successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "an error occurred" });
  }
};

// const showHomePage = (req, res) => {
//   const user = req.user;
//   res.render("home", { user })
// };
module.exports = {
  register,
  login,
  sendEmail,
  forgotPassword,
  resetPassword,
  validateResetToken,
  
};