const express = require('express')
const router = express.Router()

router.get('/', isLoggedIn, function(req, res, next) {
  res.render('profile', { title: 'Profile', user: req.user });
});

module.exports = router;

// route middleware to make sure
function isLoggedIn(req, res, next) {
	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('login');
}