const express = require('express')
const Controller = require('../controllers/controller')
const app = express()
const home_router = express.Router()
const feeds_router = require(`./feeds`)

home_router.get('/', Controller.home)
home_router.use(`/`, feeds_router)

module.exports = home_router