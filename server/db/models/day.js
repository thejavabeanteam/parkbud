const Sequelize = require('sequelize');
const db = require('../db');

const Day = db.define('day', {
    userId: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    dayOfWeek: {
        type: Sequelize.ENUM("Monday", "Tuesday", "Wednesday", "Thursday", "Friday"),
        primaryKey: true
    },
    departure: {
        type: Sequelize.TIME,
        isAfter: this.arrival
    }
});

module.exports = Day;
