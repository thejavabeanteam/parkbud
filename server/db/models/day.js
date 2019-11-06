const Sequelize = require('sequelize');
const db = require('../db');

const Day = db.define('day', {
    userId: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    dayOfWeek: {
        type: Sequelize.ENUM("Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"),
        primaryKey: true
    },
    arrival:{
        type: Sequelize.TIME
    },
    departure: {
        type: Sequelize.TIME,
        isAfter: this.arrival
    },
    earliest: {
        type: Sequelize.TIME,
        isBefore: this.arrival
    }
});

module.exports = Day;
