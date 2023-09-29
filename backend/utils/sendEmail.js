

const nodemailer = require("nodemailer");

const sendEmail = async(options)=>{
    const transporter = nodemailer.createTransport({
        service:process.env.SMPT_SERVICE,
        port:465,
        secure: true, // true for 465, false for other ports
        debug: true,
        secureConnection: false,
        service: process.env.SMPT_SERVICE,

        auth:{
            user: process.env.SMPT_MAIL,
            pass: process.env.SMPT_PASSWORD,
        }
    })
    const mailoptions ={
        from: process.env.SMPT_MAIL,

        to:options.email,
        subject:options.subject,
        text:options.message
    }

    // console.log(transporter.options.host);

    await transporter.sendMail(mailoptions)
}

module.exports = sendEmail