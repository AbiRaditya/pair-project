const express = require('express')
const Controller = require('../controllers/controller')
const app = express()
const home_router = express.Router()

home_router.get('/', Controller.home)


module.exports = home_router