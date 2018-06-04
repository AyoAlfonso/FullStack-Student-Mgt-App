const express = require('express');

const router = express.Router();
const authController = require('../../controller/auth');

router.get('/', authController.isLoggedIn);

router.get('/admin/login', authController.isNotLoggedIn, (req, res) => {
    return res.render('login', {
        title: `Student-Board LogIn`,
        message: `Welcome`,
    })
})

router.post('/admin/login',authController.login);

router.get('/logout', authController.logout);


/** Based on convention. This is where the admin route to make a user a faculty,
 * it is an admin page so it has to be protected by some controller logic
 * Here a simple JWT authentication is used
*/
router.post('/admin/:uid/:facultyid/create',  authController.isLoggedIn, async function (req, res) {

})

module.exports = router