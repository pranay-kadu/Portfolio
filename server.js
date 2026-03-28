require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;

// ─── Middleware ───────────────────────────────────────────────
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ─── Nodemailer Transporter ───────────────────────────────────
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS   // Gmail App Password (16 chars, no spaces)
    }
});

// ─── Serve Frontend ───────────────────────────────────────────
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// ─── POST /api/contact ────────────────────────────────────────
app.post('/api/contact', async (req, res) => {
    const { fullName, email, subject, message } = req.body;

    // ── Server-side validation ──
    const errors = [];
    if (!fullName || fullName.trim().length < 2)
        errors.push('Full name is required (min 2 characters).');
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
        errors.push('A valid email address is required.');
    if (!subject || subject.trim().length < 3)
        errors.push('Subject is required (min 3 characters).');
    if (!message || message.trim().length < 10)
        errors.push('Message is required (min 10 characters).');

    if (errors.length > 0) {
        return res.status(400).json({ success: false, errors });
    }

    // ── HTML Email Template ──
    const htmlTemplate = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 30px auto; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #1a73e8, #0f4fa8); padding: 30px; text-align: center; }
        .header h1 { color: #fff; margin: 0; font-size: 24px; }
        .body { padding: 30px; }
        .field { margin-bottom: 20px; }
        .label { font-size: 12px; font-weight: bold; color: #888; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px; }
        .value { font-size: 15px; color: #333; background: #f9f9f9; padding: 10px 14px; border-radius: 6px; border-left: 4px solid #1a73e8; }
        .message-value { white-space: pre-wrap; }
        .footer { text-align: center; padding: 20px; font-size: 12px; color: #aaa; background: #f9f9f9; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📬 New Portfolio Message</h1>
        </div>
        <div class="body">
          <div class="field">
            <div class="label">👤 Sender Name</div>
            <div class="value">${fullName.trim()}</div>
          </div>
          <div class="field">
            <div class="label">📧 Sender Email</div>
            <div class="value">${email.trim()}</div>
          </div>
          <div class="field">
            <div class="label">📌 Subject</div>
            <div class="value">${subject.trim()}</div>
          </div>
          <div class="field">
            <div class="label">💬 Message</div>
            <div class="value message-value">${message.trim()}</div>
          </div>
        </div>
        <div class="footer">Sent via Pranay Kadu's Portfolio Contact Form</div>
      </div>
    </body>
    </html>`;

    const mailOptions = {
        from: `"${fullName.trim()}" <${process.env.EMAIL_USER}>`,
        replyTo: email.trim(),
        to: process.env.EMAIL_USER,
        subject: `📬 Portfolio: ${subject.trim()}`,
        html: htmlTemplate
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`✅ Email sent from ${email}`);
        return res.status(200).json({ success: true, message: 'Message sent successfully!' });
    } catch (err) {
        console.error('❌ Email error:', err.message);
        return res.status(500).json({ success: false, errors: ['Failed to send email. Please try again later.'] });
    }
});

// ─── Keep old route working (backward compat) ─────────────────
app.post('/send-email', (req, res) => res.redirect(307, '/api/contact'));

// ─── Start Server ─────────────────────────────────────────────
app.listen(PORT, () => {
    console.log(`🚀 Server running → http://localhost:${PORT}`);
});
