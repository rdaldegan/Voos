import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// eslint-disable-next-line func-names
export default async function Handler(req, res) {
  dotenv.config();
  const transporter = nodemailer.createTransport({
    port: 465,
    host: 'smtp.gmail.com',
    auth: {
      user: '<email da voos aqui>',
      pass: process.env.NEXT_NODEMAIL_PASSWORD,
    },
    secure: true,
  });
  const mailData = {
    from: '<email da voos aqui>',
    to: '<email da voos aqui>',
    subject: `Mensagem de ${req.body.name}`,
    text: `${req.body.message} | Enviado de: ${req.body.email}`,
    html: `<div>${req.body.message}</div>
    <p>Enviado por:
      ${req.body.email}
    </p>`,
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
