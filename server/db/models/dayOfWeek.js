const Sequelize = require('sequelize')
const db = require('../db')

const DayOfWeek = db.define('dayOfWeek', {
    type: Sequelize.ENUM,
    values: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
})