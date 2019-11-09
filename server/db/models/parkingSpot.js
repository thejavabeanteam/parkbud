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
        type: Sequelize.STRING
        // example: /api/user/vehicle/spot/354C%253%20Walnut,%20California
        // where '354C%253%20Walnut,%20California' is the google maps plus code '354C+53% Walnut, California'
        // perhaps we can have a pindrop feature on the client side and automatically grab the address from here
    },

});

module.exports = ParkingSpot;
