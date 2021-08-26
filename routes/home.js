const express = require('express')
const Controller = require('../controllers/controller')
const app = express()
const home_router = express.Router()
const feeds_router = require(`./feeds`)

const user_router =require('./user')

home_router.get('/', Controller.home)
home_router.use(`/`, feeds_router)
home_router.use('/users', user_router)


module.exports = home_router