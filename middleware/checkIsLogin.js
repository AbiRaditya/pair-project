function checkIsLogin(req, res, next) {
    if(!req.session.isLogin){
        res.redirect('/users/login')
    } else {
        next()
    } 
}

module.exports = checkIsLogin;