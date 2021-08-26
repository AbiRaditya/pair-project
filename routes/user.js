const user_router = require('express').Router()
const userController =require('../controllers/user_controller')

user_router.get('/user', userController)

module.exports = user_router;