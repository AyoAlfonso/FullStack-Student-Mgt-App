const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.sendgrid.API_KEY);
let MAIN_URL = process.env.config.SITE_URL;
let API_URL = process.env.config.API_URL;

module.exports = {
    sendWelcomeEmail: async function(studentEmail, studentName , newStudentCode) {

        let senderEmail = {
            "email": "no-reply@digication.com",
            "name": "in",
        }

        let msg = {
            reply_to: `no_reply@digication.com`,
            to: studentEmail,
            from: `no_reply@digication.com` ,
            subject: `You have been accpeted into your desired course!  `,
            templateId: '12b7ec45-c144-4885-b7f3',
            substitutions: {
                name: studentName,
                studtentAcceptanceCodeLink: `${MAIN_URL}/accept/${newStudentCode}`,
                newStudentCode: ,
                trackingURL: `${API_URL}/imgTracking/nannyfix-logo/${newUserReferralCode}/12b7ec45-c144-4885-b7f3`,
            },
        };

        try {
            await sgMail.send(msg)
        } catch (error) {
                console.log(error.message)
        }
    },
}