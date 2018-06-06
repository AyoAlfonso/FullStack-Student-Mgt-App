'use strict'

const express = require('express')

const router = express.Router()
let models = require('../src/server/models');

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

    /**
     We use the middleware to get and store data we might be using across
     multple routes spanning the life span of the request
     */

    if (req.body.userId){
        let user = await models.Users.findOne({
        //  include: [ models.Enrollments],
          where: {
            studentId: req.body.userId,
          },
         })
        req.user = user
    }
    if (req.body.courseCode){
       let course =  models.Users.findOne({courseCode: req.body.courseCode })
       req.course = course
    }
    next()
})

router.use('/api/find/:uid', async function (req, res, next) {
    let user = req.user
    if (!user) {
        return res.status(404).json({
             message: 'User not found!',
            code: 404,
         })
    }
    next()
})

router.use('/api/enrollment/add', async function (res, req, next ) {
     let user = req.user
     let course = req.course

     if (!user) {
       return res.status(404).json({
            message: 'User not found !',
           code: 404,
       })
    }

    if (!course) {
        return res.status(404).json({
            message: 'Course not found !',
            code: 404,
        })
    }
     if (user&&course){
         next()
     }
  })


router.use('/api/enrollment/remove', async function (res, req, next ) {
    let user = req.user
    let course = req.course

    if (!user) {
      return res.status(404).json({
           message: 'User not found !',
          code: 404,
      })
   }

   if (!course) {
       return res.status(404).json({
           message: 'Course not found !',
           code: 404,
       })
   }
    if (user&&course){
        next()
    }
 })

 router.use('/api/find-faculty', async function (req, res, next) {
    let user = req.user
    if (!user) {
        return res.status(404).json({
             message: 'User not found!',
            code: 404,
         })
    }
    next()
})

module.exports = router
