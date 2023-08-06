import nodemailer from "nodemailer";

const kirimEmail = async (dataEmail: any) => {
  var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
  });

  return await transporter
    .sendMail(dataEmail)
    .then(() => {
      console.log(`Email berhasil terkirim`);
    })
    .catch((err) => {
      console.log(err);
    });
};

export default kirimEmail;
