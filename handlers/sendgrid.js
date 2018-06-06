'use strict'
const sgMail = require('@sendgrid/mail');

require('dotenv').config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
let MAIN_URL = process.env.CONFIG_SITE_URL;
let API_URL = process.env.CONFIG_API_URL;

module.exports = {
    sendWelcomeEmail: async (studentEmail, studentName , newStudentCode) =>{

        let senderEmail = {
            "email": "no-reply@digication.com",
            "name": "Digication",
        }

        let msg = {
            reply_to: senderEmail,
            to: studentEmail,
            from: `no_reply@digication.com` ,
            subject: `You have been accpeted into your desired course!  `,
            templateId: '12b7ec45-c144-4885-b7f3',
            substitutions: {
                name: studentName,
                studtentAcceptanceCodeLink: `${MAIN_URL}/accept/${newStudentCode}`,
                StudentCode: newStudentCode,
                trackingURL: `${API_URL}/imgTracking/nannyfix-logo/${newStudentCode}/12b7ec45-c144-4885-b7f3`,
            },
        };

        try {
            await sgMail.send(msg)
        } catch (error) {
            console.log(error.message)
        }
    },
}