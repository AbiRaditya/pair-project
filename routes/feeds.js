const express = require('express')
const Controller = require('../controllers/controller')
const app = express()
const feeds_router = express.Router()

feeds_router.get(`/feeds` , Controller.getFeed)


module.exports = feeds_router