const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')
const Schedule = require('./schedule')
const Vehicle = require('./vehicle')
const School = require('./school')





const User = db.define('user', {
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        isEmail: true

    },
    password: {
        type: Sequelize.STRING
    },
    salt: {
        type: Sequelize.STRING
    },
    googleID: {
        type: Sequelize.STRING,
    },
    facebookID: {
        type: Sequelize.STRING,
    },

    gender: {
        type: Sequelize.ENUM,
        values:['Male', 'Female', 'Other']

    },
    phoneNumber: {
        type: Sequelize.INTEGER,
    },

    accountType: {
        type: Sequelize.ENUM,
        values: ['Student', 'Faculty']
    },
    zipCode: {
        type: Sequelize.INTEGER,
        defaultValue: ''
    },
    schedule: {
        type: Schedule
    },
    vehicle: {
        type: Vehicle
    },
    school: {
        type: School
    },
})

module.exports = User;

User.prototype.correctPassword = function (possiblePWD) {
    return User.encryptPassword(possiblePWD, this.salt) === this.password
}


User.generateSalt = function () {
    return crypto.randomBytes(16).toString('base64')
}

User.encryptPassword = function (plainText, salt) {
    return crypto
        .createHash('RSA-SHA256')
        .update(plainText)
        .update(salt)
        .digest('hex')

}

const setSaltaNDpassword = user => {
    if(user.changed('password')) {
        user.salt = User.generateSalt()
        user.password = User.encryptPassword(user.password, user.salt)
    }
}

User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)
