const { logDebug } = require('../../loggers/logger');

const sendWhatsAppMessage = async (to, message) => {
    const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    const response = await client.messages.create({
        body: message,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: to
    })
    logDebug(response);
    return response;
}

const sendWhatsAppMessageToAdmin = async (message) => {
    const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    const response = await client.messages.create({
        body: message,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: process.env.ADMIN_PHONE_NUMBER
    })
    logDebug(response);
    return response;
}

module.exports = {
    sendWhatsAppMessage,
    sendWhatsAppMessageToAdmin
}
