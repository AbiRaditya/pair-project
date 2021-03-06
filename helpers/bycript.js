const bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

function hashPassword(userPassword) {
    return bcrypt.hashSync(userPassword, salt)
}

function checkPassword(plainPassword, hashedPassword) {
    return bcrypt.compareSync(plainPassword, hashedPassword)
}

module.exports = { hashPassword, checkPassword };