const emailService = require("../services/emailServices");

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
  sendEmail,
};