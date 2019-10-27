const Sequelize = require('sequelize')
const db = require('../db')

const ParkingLot = db.define('parkingLot', {
    name: {
        type: Sequelize.STRING,
    },
    school: {},
})