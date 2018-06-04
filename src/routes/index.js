const express = require('express');

const router = express.Router();

router.get('/', function(req, res) {
    res.status(200).json({
        message: 'Welcome to the Student-Management API!',
        code: 200,
   })
})

module.exports = router