function checkIsLogin(req, res, next) {
    if(!req.session.isLogin){
        res.redirect('/user')
    } else {
        next()
    } 
}