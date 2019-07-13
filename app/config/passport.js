// load all the things we need
const LocalStrategy   = require('passport-local').Strategy
const bcrypt = require('bcrypt')

// mysql database
const knex = require('@config/mysql')

module.exports = function(passport) {

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser( async function(id, done) {
        let user = await knex('users').where('id', id)
        if (user.length != 0) 
            done(null, user[0])
    });

    passport.use('local-login', 
        new LocalStrategy({
             // by default, local strategy uses username and password, we will override with email
             usernameField : 'username',
             passwordField : 'password',
             passReqToCallback : true // allows us to pass back the entire request to the callback
        }, async function (req, username, password, done) {
            let userByEmail = await knex('users').where('email', username)
            if (userByEmail.length == 0) {
                return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
            } else {
                
                if(!bcrypt.compareSync(password, userByEmail[0].password)) 
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
            }

            // all is well, return successful user
            return done(null, userByEmail[0]);
        })
    )
}
