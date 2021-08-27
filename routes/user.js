const user_router = require('express').Router()
const userController =require('../controllers/user_controller');
const checkIsLogin = require('../middleware/checkIsLogin');


user_router.get('/register',  userController.getUserRegister)
user_router.post('/register', userController.postUserRegister)
user_router.get('/login', userController.getUserlogIn)
user_router.post('/login',  userController.postUserLogIn)

user_router.use(checkIsLogin)

user_router.get('/logout', userController.getUserLogOut)

module.exports = user_router;