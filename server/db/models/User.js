const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const User = db.define('user', {
    username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        //isEmail: true

    },
    password: {
        type: Sequelize.STRING,
    },
    gender: {
        type: Sequelize.STRING,
    },
    accountType: {
        type: Sequelize.STRING,
    },
    schedule: {

    },
    vehicle: {

    },
    school: {

    },
})