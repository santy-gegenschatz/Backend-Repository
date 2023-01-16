const { createTransport } = require('nodemailer') 

const SENDER_MAIL = process.env.SENDER_MAIL
const SENDER_PASSWORD = process.env.SENDER_PASSWORD

const transporter = createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: SENDER_MAIL,
        pass: SENDER_PASSWORD
    }
})

const sendEmail = async (to, subject, text) => {
    const info = await transporter.sendMail({
        from: SENDER_MAIL,
        to,
        subject,
        text
    })
    console.log('Message sent: %s', info.messageId);
}

module.exports = { sendEmail }