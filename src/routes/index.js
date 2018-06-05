const express = require('express');

const router = express.Router();
let date = require('date-and-time');

let connection = {query: "This is a dummy direct connection to the db, just to show how image tracking can be implented"};

router.get('/', function(req, res) {
    res.status(200).json({
        message: 'Welcome to the Student-Management API!',
        code: 200,
   })
})

router.get('/imgTracking/:imgtype/:refcode/:emailType/', async function(req, res) {
    let encodedImgUrl = req.url
    let imgArray = encodedImgUrl.split('/');
    let refcode = imgArray[3],
        emailType = imgArray[4],
        eventType = "Image_URL_Request",
        time = date.format(new Date(), 'YYYY-MM-DD HH:mm:ss');

    try {
        let user = await connection.query('SELECT email FROM users WHERE `studentId`=(?)', [refcode]);
        if (user.length !== 0) {
            await connection.query('INSERT INTO metrics (email, event, timestamp, description, emailcode) VALUES (?, ?, ?, ?, ?)', [user[0].email, eventType, time, "open", emailType])
            return res.redirect(`https://www.digication.com/images/DigicationLogowht.png`)
        }

        //A fallback image in case the event is not recognised.
        res.redirect(`https://www.digication.com/images/DigicationLogowht.png`)
    } catch (error) {
        return res.status(500).json({
            message: `An error occured while trying to hadle image request user ${error.message}`,
            code: 500,
        })
    }
})


module.exports = router