
const { resetPassword } = require('../services/reset_email.service');


const sendPasswordResetEmail = async (req, res) => {
  try {
    const { email, resetToken, newPassword } = req.body;
    await resetPassword(email, resetToken, newPassword);
    res.status(200).json({ message: 'Password reset successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred.' });
  }
};

module.exports = {
    sendPasswordResetEmail
};