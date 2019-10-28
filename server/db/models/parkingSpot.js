const Sequelize = require('sequelize')
const db = require('../db')
const ParkingLot =  require('./parkingLot')

const ParkingSpot = db.define('parkingSpot', {
    location: {
        type: ParkingLot
    },
    locationDescription: {
        type: Sequelize.STRING
    },
    parkingPreferences: {


    }


})