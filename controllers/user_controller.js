const { User }=require('../models')
const { checkPassword } =require('../helpers/bycript')

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
        User.findOne({
            where: {
                username: username
            }
        })
        .then(user => {
            if(user) {
                let comparePass = checkPassword(password, user.password)
                if(comparePass) {
                    req.session.isLogin = true
                    req.session.username = user.username
                    req.session.userId = user.id
                    req.redirect(`/`)
                } else {
                    res.redirect('/users/register?alert=wrong username or password')
                }
            }
            else {
                res.redirect(`/users/register?alert= username has been taken`)
            }
        })
        .catch(err => res.send(err))
    }

    static getUserLogOut() {
        req.session.destroy(err => {
            if(err){
                res.send(err);
            } else {
                res.redirect('/?alert=Successfully logged out');
        }})
    }
}

module.exports = UserController;