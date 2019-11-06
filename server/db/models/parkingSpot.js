const Sequelize = require('sequelize');
const db = require('../db');

const ParkingSpot = db.define('parkingSpot', {
    ownerId: {
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
