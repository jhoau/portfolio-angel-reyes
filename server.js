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

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Configurar transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Verificar conexión
transporter.verify((error, success) => {
    if (error) {
        console.log('❌ Error:', error);
    } else {
        console.log('✅ Email transporter is ready to send messages');
    }
});

// Endpoint de contacto
app.post('/api/contact', async (req, res) => {
    const { nombre, email, mensaje } = req.body;
    
    // Validación
    if (!nombre || !email || !mensaje) {
        return res.status(400).json({
            success: false,
            message: 'All fields are required'
        });
    }
    
    // Opciones del email
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: `New message from ${nombre}`,
        text: `Name: ${nombre}\nEmail: ${email}\nMessage: ${mensaje}`,
        html: `
            <h2>New contact message</h2>
            <p><strong>Name:</strong> ${nombre}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p>${mensaje}</p>
        `
    };
    
    // Enviar email
    try {
        await transporter.sendMail(mailOptions);
        console.log(`✉️ Email received from: ${nombre} (${email})`);
        
        res.status(200).json({
            success: true,
            message: 'Message sent successfully'
        });
    } catch (error) {
        console.error('❌ Error:', error);
        
        res.status(500).json({
            success: false,
            message: 'Error sending message'
        });
    }
});

// ⭐ IMPORTANTE: Esta parte mantiene el servidor corriendo
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📧 Email configured: ${process.env.EMAIL_USER}`);
});