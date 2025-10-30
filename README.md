# 🌐 Portfolio – Angel Reyes

Personal portfolio showcasing my projects and technical skills with a functional contact form.

## 🚀 Tech Stack
- **Frontend:** HTML, CSS, JavaScript (Bilingual EN/ES)
- **Backend:** Node.js, Express, Nodemailer


## 🧩 Featured Projects
1. **TechMate** - Service marketplace (Next.js + Prisma)
2. **HR Management System** - Employee management (Node.js + TypeScript + SQL)
3. **Enterprise Inventory System** - Automation (Power Apps + SQL Server)

## ⚙️ Quick Setup

```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Add your Gmail credentials

# Run
npm start
```

### Gmail Setup
1. Enable 2-Step Verification: https://myaccount.google.com/security
2. Generate App Password: https://myaccount.google.com/apppasswords
3. Add to `.env`:
```env
PORT=3000
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-char-app-password
```

## 📧 Contact API
```bash
POST /api/contact
{
  "nombre": "Name",
  "email": "email@example.com",
  "mensaje": "Message"
}
```

## 👤 Author
**Angel Reyes** -  Software Developer

---
