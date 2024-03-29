const crypto = require('crypto');
const Sequelize = require('sequelize');
const db = require('../db');

const User = db.define('user', {
    name: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        isEmail: true
    },
    password: {
        type: Sequelize.STRING,
    },
    gender: {
        type: Sequelize.ENUM('male', 'female', 'other')
    },
    accountType: {
        type: Sequelize.ENUM('student', 'faculty')
    },
    parkingPreferences: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        defaultValue: []
    },
    message: {
        type: Sequelize.TEXT
    },
    phoneNumber: {
        type: Sequelize.STRING,
        defaultValue: ''
    },
    salt: {
        type: Sequelize.STRING
    }
});

module.exports = User;

/**
 * instanceMethods
 */
User.prototype.correctPassword = function (candidatePwd) {
    return User.encryptPassword(candidatePwd, this.salt) === this.password
};

/**
 * classMethods
 */
User.generateSalt = function () {
    return crypto.randomBytes(16).toString('base64')
};

User.encryptPassword = function (plainText, salt) {
    return crypto
        .createHash('RSA-SHA256')
        .update(plainText)
        .update(salt)
        .digest('hex')
};

/**
 * hooks
 */
const setSaltAndPassword = user => {
    if (user.changed('password')) {
        user.salt = User.generateSalt();
        user.password = User.encryptPassword(user.password, user.salt)
    }
};


User.beforeCreate(setSaltAndPassword);
User.beforeUpdate(setSaltAndPassword);

