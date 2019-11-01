const Sequelize = require('sequelize')
const db = require('../db')
const DayOfWeek = require('./dayOfWeek')

const Day = db.define('day', {
    arrival: {
        type: Sequelize.TIME
    },
    departure:{
        type:Sequelize.TIME,
        isAfter: this.arrival
    },
    dayOfWeek: {
        type: DayOfWeek
    },
})


module.exports = Day;