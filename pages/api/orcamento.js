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
    subject: `Message From ${req.body.name}`,
    text: `${req.body.message} | Sent from: ${req.body.email}`,
    html: `
    <div>
        <h1>Evento ${req.body.evento} de ${req.body.name}</h1>
        <br />
        <p>${req.body.message}</p>
        <br />
        <ul>
          <li>${req.body.tipo}</li>
          <li>${req.body.numeroPessoas}</li>
          <li>${req.body.dataEstimada}</li>
        </ul>
        <br />
        <p>Enviado por: ${req.body.email}</p>
      </div>`,
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
