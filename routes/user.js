const user_router = require('express').Router()
const userController =require('../controllers/user_controller');
const user = require('../models/user');

user_router.get('/register', userController.getUserRegister)
user_router.post('/register', userController.postUserRegister)
user_router.get('/login', userController.getUserlogIn)

module.exports = user_router;