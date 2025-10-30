const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static('public'));

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: { 
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASS
    }
  });

  transporter.verify((error, success) => {
    if (error) {
        console.log('Error configuring email transporter:', error);
    } else {
        console.log('Email transporter is ready to send messages');
    } 
});

app.post('/api/contact', async (req, res) => {

  const {nombre, email, mensaje} = req.body;

  console.log('📨 received data:',{nombre,email,mensaje});
});

app.post('/api/contact', async (req, res) => {
    const { nombre, email, mensaje } = req.body;
    
    // Validar que todos los campos existan
    if (!nombre || !email || !mensaje) {
        return res.status(400).json({
            success: false,
            message: 'All the fields are required'
        });
    }
    
    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid email'
        });
    }
    
    console.log('✅ Validation passed:');
});