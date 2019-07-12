const express = require('express')
const router = express.Router()
const passport  = require('passport')

router.get('/',function(req,res,next){
    res.render('auth/login',{
        title: 'Login'
    })
})

router.post('/',passport.authenticate('local',{
    successRedirect:'/dashboard',
    failureRedirect:'/login'
}))

module.exports = router