const express = require('express')
const knex = require('@config/mysql')
const uuidv1 = require('uuid/v1')
const router = express.Router()

router.get('/', async function(req, res, next) {
    try {
        let categories = await knex('categories')
        res.send(categories)
    } catch (e) {
        res.send(e, 400)
    }
})

router.post('/', async function(req, res, next) {
    try {
        let body = {}
        body.id = uuidv1()
        body.name = req.body.name
        body.slug = req.body.name
        body.description = req.body.description

        console.log(req.body)
        let category = await knex('categories').insert(body)
        if (!category) throw 'cant save data'
        res.send(body)
    } catch (e) {
        res.send(e, 400)
    }
})

router.get('/:id', async function(req, res, next) {
    try {
        let id = req.params.id
        let category = await knex('categories').where('id', id)
        if (category.length == 0) throw 'data not found'
        res.send(category[0])
    } catch (e) {
        res.send(e, 400)
    }
})

router.put('/:id', async function(req, res, next) {
    try {
        let id = req.params.id
        let body = req.body
        let category = await knex('categories').where('id', id)
        if (category.length == 0) throw 'data not found'
        let update = await knex('categories').where('id', id).update(body)
        res.send(body)
    } catch (e) {
        res.send(e, 400)
    }
})

router.delete('/:id', async function(req, res, next) {
    try {
        let id = req.params.id
        let category = await knex('categories').where('id', id)
        if (category.length == 0) throw 'data not found'
        
        let delCategory = await knex('categories').where('id', id).del()
        
        res.send(category[0])
    } catch (e) {
        res.send(e, 400)
    }
})

module.exports = router