const { User }=require('../models')
class UserController {
    static getUserRegister(req, res) {
        res.render('users/register')
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
    static getUserLogin(req, res) {
        let {password, email}
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
}

module.exports = UserController;