const Sequelize = require('sequelize');
const db = require('../db');

const User = require('./user');

const Day = db.define('day', {
    userId: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    dayOfWeek: {
        type: Sequelize.ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'),
        primaryKey: true
    },
    arrival:{
        type: Sequelize.STRING
    },
    departure: {
        type: Sequelize.STRING,
        isAfter: this.arrival
    }
});

module.exports = Day;
