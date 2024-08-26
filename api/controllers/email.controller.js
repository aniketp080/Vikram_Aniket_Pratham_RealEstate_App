import nodemailer from 'nodemailer';
import { prisma } from '../lib/prisma.js';

// Create a transporter object
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS, // Your email password
  },
});

export const sendEmail = async (req, res) => {
  const { receiverId, subject, text } = req.body;

  try {
    // Get receiver's email from database
    const receiver = await prisma.user.findUnique({
      where: { id: receiverId },
      select: { email: true },
    });

    if (!receiver) return res.status(404).json({ message: 'User not found!' });

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: receiver.email,
      subject,
      text,
    });

    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to send email!' });
  }
};