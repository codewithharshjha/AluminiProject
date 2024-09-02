// lib/nodemailer.ts
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email', // e.g., smtp.gmail.com
  port: 587, // or 465 for SSL
  secure: false, // true for 465, false for other ports
  auth: {
    user: "	janie94@ethereal.email", // your email user
    pass: "KDMfvvQzBmc2GnKQsX", // your email password
  },
});

export const sendOtpEmail = async (to: string, otp: string) => {
  const mailOptions = {
    from: '"harsh jha 👻" <hjha3987@gmail.com>',
    to,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending OTP email:', error);
    throw new Error('Unable to send email');
  }
};

export const sendOtpPrincipalEmail = async (to: string, otp: string) => {
  const mailOptions = {
    from: '"harsh jha 👻" <hjha3987@gmail.com>',
    to,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending OTP email:', error);
    throw new Error('Unable to send email');
  }
};