import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
//   host: "smtp.example.com",
//   port: 587,
//   secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
service:"gmail",  
auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});


export const sendMail=async (to:string,subject:string,html:string)=>{
    await transporter.sendMail({
        from:`"snapcart" <${process.env.SMTP_USER}>`,
        to,
        subject,
        html
    })
}