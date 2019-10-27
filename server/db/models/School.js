const Sequelize = require('sequelize')
const db = require('../db')

const School = db.define('school', {
    name: {
        type: Sequelize.STRING,
    },
    city: {
        type: Sequelize.STRING,
    },
    state: {
        type: Sequelize.STRING,
    },
})