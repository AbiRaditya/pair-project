const { User }=require('../models')
const { checkPassword } =require('../helpers/bycript')

class UserController {
    static getUserRegister(req, res) {
        res.render('register')
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
            res.redirect('/user')
        })
        .catch(err => {
            res.send(err)
        })
    }

    static getUserlogIn(req, res) {
        res.render('login')
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
                    res.session.isLogin = true
                    res.session.email = user.email
                    res.session.userId = user.id
                    res.redirect(`/user`)
                } else {
                    res.redirect('/user/register?alert=wrong username or password')
                }
            }
            else {
                res.redirect(`/user/register?alert= username has been taken`)
            }
        })
        .catch(err => res.send(err))
    }

    static getUserLogOut() {
        res.session.destroy(err => {
            if(err){
                res.send(err);
            } else {
                res.redirect('/?alert=Successfully logged out');
        }})
    }
}

module.exports = UserController;