
const express = require('express')

const router = express.Router()


/** A basic security middleware for API calls
& transform our `req.` object to contain the request details we will need
*/

router.use('/', async function(req, res, next) {
console.log("Running Student api base middleware...")
  let correctHeaders = req.get('Token') == 'j2udbxkatifno1cs76p2ttcwm30zso' &&
    req.get('Key') == 'u62414re9owf9q2si0saaon2ebyr7519al'

    if (!correctHeaders) {
        return res.status(401).json({
            'message': 'Unauthorized access',
            code: 401,
        })
    }
    next()
})

