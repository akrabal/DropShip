let express = require('express')
let Home = require('../Class/Home')
let Category = require('../Class/Category')
let Product = require('../Class/Product')
let User = require('../Class/User')

module.exports = (() => {

    let api = express.Router()

    // Api Routes

    // Home
    api.route('/home').get(Home.index)


    // Category
    api.route('/category/edit/:id').post(Category.edit)


    // Product
    api.route('/products/show').get()
    api.route('/products/')


    // User
    api.route('/users/login').post(User.signIn)


    // Admin
    api.route('/admin')

    return api
})()