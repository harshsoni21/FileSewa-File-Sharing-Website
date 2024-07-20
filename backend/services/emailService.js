import nodemailer from "nodemailer";
const sendMail = async ({from, to, subject, text, html}) => {

    let transportar = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.PORT,
        secure: false,
        auth: {
            user: process.env.SMTP_EMAIL_ADDRESS,
            pass: process.env.SMTP_PASSWORD,
        }
    })

    let info = await transportar.sendMail({
        from : `FileSewa <${from}>`,
        to,
        subject,
        text,
        html,
    })
}

export {
    sendMail
}