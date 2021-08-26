const bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

function hashPassword(userPassword) {
    return bcrypt.hashSync(userPassword, salt)
}

module.exports = { hashPassword };