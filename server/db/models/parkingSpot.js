const Sequelize = require('sequelize');
const db = require('../db');

const Vehicle = require('./vehicle');

const ParkingSpot = db.define('parkingSpot', {
    vehicleId: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    parkingLot: {
        type: Sequelize.STRING
    },
    school: {
        type: Sequelize.STRING
    },
    pindrop: {
        type: Sequelize.STRING // GOOGLE MAPS PLUS CODE!
    },

});

module.exports = ParkingSpot;
