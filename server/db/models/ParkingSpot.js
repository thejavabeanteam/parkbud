const Sequelize = require('sequelize')
const db = require('../db')

const ParkingSpot = db.define('parkingSpot', {
    location: {},
    locationDescription: {
        type: Sequelize.STRING,
    },
    parkingPreferences: {

    }

})