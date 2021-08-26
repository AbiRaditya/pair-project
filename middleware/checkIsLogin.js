function checkIsLogin(req, res, next) {
    if(!req.session.isLogin){
        res.redirect('/user/login')
    } else {
        next()
    } 
}

module.exports = checkIsLogin;