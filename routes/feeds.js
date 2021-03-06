const express = require('express')
const Controller = require('../controllers/controller')
const app = express()
const feeds_router = express.Router()
const checkIsLogin = require('../middleware/checkIsLogin');

feeds_router.get(`/feeds` , Controller.getFeed)
feeds_router.post(`/feeds` , Controller.postFeed)
feeds_router.get(`/feeds/search/tags` , Controller.getSearchTags)
feeds_router.post(`/feeds/search/tags` , Controller.postSearchTags)
feeds_router.use(checkIsLogin)


module.exports = feeds_router