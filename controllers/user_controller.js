const { User }=require('../models')
const { checkPassword } =require('../helpers/bycript')

class UserController {
    static getUserRegister(req, res) {
        res.render('register' , {title:`Register`})
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
        res.render('login' ,  {title:`Login`})
    }
    static postUserLogIn(req, res) {
        let {password, email} = req.body
        User.findOne({
            where: {
                email: email
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
                    throw `wrong email or password`
                }
            }
            else {
                throw `email is not registerd`
            }
        })
        .catch(err => res.send(err))
    }

    static getUserLogOut() {
        res.session.destroy()
        res.redirect('/user/login')
    }
}

module.exports = UserController;