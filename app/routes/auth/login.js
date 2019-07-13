const express = require('express')
const router = express.Router()
const passport  = require('passport')

router.get('/',function(req,res,next){
    res.render('auth/login', { title: 'Login', message: req.flash('loginMessage') });
})
// process the login form
router.post('/', passport.authenticate('local-login', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/login', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}),
function(req, res) {
    if (req.body.remember) {
        req.session.cookie.maxAge = 1000 * 60 * 3;
    } else {
        req.session.cookie.expires = false;
    }
    res.redirect('/');
});

module.exports = router