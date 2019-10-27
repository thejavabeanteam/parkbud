const Sequelize = require('sequelize')
const db = require('../db')

const Vehicle = db.define('vehicle', {
    color: {},
    model: {},
    make: {},
    year: {},
    owner: {},
    location: {},
})