const jwt = require('jsonwebtoken');
require('dotenv').config();

let ADMIN_PASS = process.env.ADMIN_PASS;

exports.login = async (req, res) => {
let password = req.body.password.toLowerCase()
     if (password !== ADMIN_PASS) {
         return res.render('login', {
            title: `NannyFix LogIn`,
            message: `Wrong password!`,
            })
    }

    let user = {
        password: req.body.password,
    }
    jwt.sign({
        user: user,
    }, `nannyfixsecretkey`, (error, token) => {
        let bearerHeader = `Bearer ${token}`
        req.session.token = bearerHeader
        res.redirect('/admin/home')
    })
};

exports.logout = (req, res) => {
    let bearerHeader = req.session.token
    if (bearerHeader !== undefined) {
        req.session.token = undefined
        res.redirect('/admin/login')
    } else {
        res.redirect('/admin/login');
    }
};

exports.isLoggedIn = async (req, res, next) => {
    let bearerHeader = req.session.token
    if (bearerHeader !== undefined) {
        let bearer = bearerHeader.split(' ');
        let bearerToken = bearer[1];
        jwt.verify(bearerToken, "nannyfixsecretkey", (err, authdata) => {
            if (err) {
                res.render('login', {
                    title: `NannyFix Admin Board`,
                    message: `${err.message}`,
                })
            } else if (authdata) {
                next()
            }
        })
    } else {
        res.redirect('/admin/login')
    }
};

exports.isNotLoggedIn = async (req, res, next) => {
    let bearerHeader = req.session.token
    if (bearerHeader !== undefined) {
        return res.redirect('/admin/home')
    } else {
        next()
    }
};