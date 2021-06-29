const bcrypt = require('bcryptjs');

exports.getHashPassowrd = (password) => {
    //Usage - Sync
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}