function checkIsLogin(req, res, next) {
    if(req.session.isLogin){
        console.log(req.session.isLogin,`<<<2<<<3<<<<<<<<<<`);
        next()
    } else  {
        res.redirect('/users/login')
        console.log(req.session.isLogin,`<<<2<<<3<<<<<<<<<< INI DARI MIDDLEWARE`);
    } 
}

module.exports = checkIsLogin;