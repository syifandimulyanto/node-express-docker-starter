var express = require('express')
var router = express.Router()

// mysql database
const knex = require('@config/mysql')

// logic
const expressValidator = require('express-validator')
const bcrypt = require('bcrypt')
const uuidv1 = require('uuid/v1')

router.get('/', function(req, res, next) {
  res.render('auth/register', { title: 'Register' })
})

router.post('/', async function(req, res, next) {
    try {
        // req.checkBody('email', 'Enter valid Email').isEmail()
        // req.checkBody('pass', 'Password cant lest than 6').isLength({ min: 5 })
        // req.checkBody('pass_confirmation','Password Do Not Match.').equals(req.body.pass);

        // var error = req.validationErrors()
        // console.log('error =======')
        // console.log(error)
        // if (error) 
        //     res.render('auth/register', {
        //         title: 'Register',
        //         msg: 'ERROR! Please Fix Following Error ! ',
        //         errors: error
        //     })

        let password = bcrypt.hashSync(req.body.pass, 10);
        let body = {
            id: uuidv1(),
            email: req.body.email,
            fullname: req.body.fullname,
            password: password
        }

        let user = await knex('users').insert(body)
        res.redirect('login')

    } catch (e) {
        res.render('auth/register', {
            title: 'Register',
            msg: 'ERROR! Please Fix Following Error ! ',
            errors: e
        })
    }
})

module.exports = router