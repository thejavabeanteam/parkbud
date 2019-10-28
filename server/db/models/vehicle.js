const Sequelize = require('sequelize')
const db = require('../db')
const User = require('./user')
const ParkingSpot = require('./parkingSpot')


const Vehicle = db.define('vehicle', {
    color: {
        type: Sequelize.STRING
    },
    model: {
        type: Sequelize.STRING
    },
    make: {
        type: Sequelize.STRING
    },
    year: {
        type: Sequelize.INTEGER
    },
    owner: {
        type: User
    },
    location: {
        type: ParkingSpot
    },
})