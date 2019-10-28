const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')
const Schedule = require('./schedule')
const Vehicle = require('./vehicle')
const School = require('./school')





const User = db.define('user', {
    username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        //isEmail: true

    },
    password: {
        type: Sequelize.STRING
    },
    gender: {
        type: Sequelize.ENUM,
        values:['Male', 'Female', 'Other']

    },
    accountType: {
        type: Sequelize.STRING
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