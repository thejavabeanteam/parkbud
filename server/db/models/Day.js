const Sequelize = require('sequelize')
const db = require('../db')

const Day = db.define('day', {
    arrival: {
        type: Sequelize.STRING,
    },
    departure:{
        type:Sequelize.STRING,
    },
    dayOfWeek: {

    },
})