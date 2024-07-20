import nodemailer from "nodemailer";
import { SMTP_EMAIL_ADDRESS,SMTP_EMAIL_PASSWORD,SMTP_HOST,SMTP_PORT } from "../private/doc";
const sendMail = async ({from, to, subject, text, html}) => {

    let transportar = nodemailer.createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: false,
        auth: {
            user: SMTP_EMAIL_ADDRESS,
            pass: SMTP_EMAIL_PASSWORD,
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