const { User }=require('../models')
const { checkPassword } =require('../helpers/bycript')
const {checkIslogin} =require('../middleware/checkIsLogin')

class UserController {
    static getUserRegister(req, res) {
        res.render('register' , {alert: req.query.alert, title:`Register`})
    }

    static postUserRegister(req, res) {
        let {first_name, last_name, password, email, username} = req.body
        
        User.create({
            first_name: first_name,
            last_name: last_name,
            password: password,
            email: email,
            username: username
        })
        .then(()=> {
            res.redirect('/users/login')
        })
        .catch(err => {
            res.send(err)
        })
    }

    static getUserlogIn(req, res) {
        res.render('login' ,  {alert: req.query.alert, title:`Login`})
    }
    static postUserLogIn(req, res) {
        let {password, username} = req.body
        User.findAll({
            where: {
                username: username
            }
        })
        .then(user => {
            if(user) {
                let comparePass = checkPassword(password, user[0].password)
                if(comparePass) {
                    req.session.isLogin = true
                    req.session.username = user[0].username
                    req.session.password = user[0].password
                    req.session.userId = user[0].id
                    res.redirect(`/feeds`)
                } else {
                    res.redirect('/users/login?alert=wrong username or password')
                }
            }
            else {
                res.redirect(`/users/login?alert= username has been taken`)
            }
        })
        .catch(err =>{
            console.log(err,`<<<<<<<<<`);
             res.send(err)
        })
    }

    static getUserLogOut(req,res) {
        // req.session.destroy(err => {
        //     if(err){
        //         res.send(err);
        //     } else {
        //         res.redirect('/?alert=Successfully logged out');
        // }})
        req.session.destroy()
        res.redirect(`/users/login`)
        // console.log(req.session);
    }
}

module.exports = UserController;