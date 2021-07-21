import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// eslint-disable-next-line func-names
export default async function Handler(req, res) {
  dotenv.config();
  const transporter = nodemailer.createTransport({
    port: 465,
    host: 'smtp.gmail.com',
    auth: {
      user: 'mockEmail',
      pass: process.env.NEXT_NODEMAIL_PASSWORD,
    },
    secure: true,
  });
  const mailData = {
    from: 'mockEmail',
    to: 'mockEmail',
    subject: `Message From ${req.body.name}`,
    text: `${req.body.message} | Sent from: ${req.body.email}`,
    html: `<div>${req.body.message}</div><p>Sent from:
    ${req.body.email}</p>`,
  };
  return new Promise((resolve) => {
    transporter.sendMail(mailData, (err) => {
      if (err) {
        res.status(400).end();
        return resolve();
      }
      res.status(200).end();
      return resolve();
    });
  });
}
