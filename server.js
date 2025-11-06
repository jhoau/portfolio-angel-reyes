const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

// ======= Email (Nodemailer) =======
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // se usa STARTTLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error('❌ SMTP verify error:', error);
  } else {
    console.log('✅ SMTP ready:', success);
  }
});

// ======= API =======
app.post('/api/contact', async (req, res) => {
  const { nombre, email, mensaje } = req.body || {};

  if (!nombre || !email || !mensaje) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New message from ${nombre}`,
      replyTo: email,
      text: `Name: ${nombre}\nEmail: ${email}\nMessage:\n${mensaje}`,
      html: `
        <h2>New contact message</h2>
        <p><strong>Name:</strong> ${nombre}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${mensaje}</p>
      `
    });
    return res.status(200).json({ success: true, message: 'Message sent successfully' });
  } catch (err) {
    console.error('❌ Send mail error:', err);
    return res.status(500).json({ success: false, message: 'Error sending message' });
  }
});

// ======= Routes =======
app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get(/^\/(?!api).*/, (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ======= Run =======
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📧 Email user: ${process.env.EMAIL_USER || '(not set)'}`);
});
