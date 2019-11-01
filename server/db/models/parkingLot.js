const Sequelize = require('sequelize')
const db = require('../db')
const School = require('./school')


const ParkingLot = db.define('parkingLot', {
    name: {
        type: Sequelize.STRING
    },
    school: {
        type: School
    },
})


module.exports = ParkingLot;