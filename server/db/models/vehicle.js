const Sequelize = require('sequelize');
const db = require('../db');

const Vehicle = db.define('vehicle', {
    vehicleId: {
        type: Sequelize.INTEGER,
        unique: true,
        primaryKey: true
    },
    ownerId: {
        type: Sequelize.INTEGER,
        unique: true
    },
    color: {
        type: Sequelize.STRING
    },
    model: {
        type: Sequelize.STRING,
    },
    make: {
        type: Sequelize.STRING
    },
    year: {
        type: Sequelize.INTEGER
    }
});

module.exports = Vehicle;
