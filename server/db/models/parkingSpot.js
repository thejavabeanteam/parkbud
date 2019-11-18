const Sequelize = require('sequelize');
const db = require('../db');

const ParkingSpot = db.define('parkingSpot', {
    userId: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    parkingLot: {
        type: Sequelize.STRING
    },
    school: {
        type: Sequelize.STRING
    }
});

module.exports = ParkingSpot;
