const Sequelize = require('sequelize')
const db = require('../db')
const Day = require('./day')

const Schedule = db.define('schedule', {
    days: {
        type: Sequelize.ARRAY(Day),
        defaultValue: []
    },
})