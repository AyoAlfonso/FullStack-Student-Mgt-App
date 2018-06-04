const sgMail = require('@sendgrid/mail');
const Keys = require('../keys');
const connection = require('../controller/db');
sgMail.setApiKey(Keys.sendgrid.API_KEY);
let MAIN_URL = Keys.config.SITE_URL;
let API_URL = Keys.config.API_URL;

module.exports = {
    sendWelcomeEmail: async function(subscriberEmail, subscriberName, newUserReferralCode, newUserCurrentPosition, newUserReferralCount) {

        let senderEmail = {
            "email": "wecare@nannyfix.com",
            "name": "NannyFix",
        }

        let msg = {
            reply_to: senderEmail,
            to: subscriberEmail,
            from: senderEmail,
            subject: `Welcome to NannyFix`,
            templateId: '12b7ec45-c144-4885-b7f3-25cf730d0e64',
            substitutions: {
                name: subscriberName,
                userReferralCodeLink: `${MAIN_URL}/invite/${newUserReferralCode}`,
                userPosition: newUserCurrentPosition,
                userReferredCount: newUserReferralCount,
                userVerificationCodeLink: `${MAIN_URL}/verify/${newUserReferralCode}`,
                userReferralCode: newUserReferralCode,
                trackingURL: `${API_URL}/imgTracking/nannyfix-logo/${newUserReferralCode}/12b7ec45-c144-4885-b7f3-25cf730d0e64`
            }
        };

        try {
            await sgMail.send(msg)
            await connection.query('INSERT INTO activities (email, referral_code, activity) VALUES (?, ?, ?)', [subscriberEmail, newUserReferralCode, msg.templateId])
            console.log("Succesfully sent email to " + subscriberName)
        } catch (error) {
            console.error(error.message)
        }
    },
}