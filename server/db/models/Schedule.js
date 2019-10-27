const Sequelize = require('sequelize')
const db = require('../db')

const Schedule = db.define ('schedule', {
    days: {},
})