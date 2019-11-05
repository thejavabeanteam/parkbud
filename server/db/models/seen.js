const Sequelize = require('sequelize');
const db = require('../db');

const User = require('./user');


const Seen = db.define('seen', {
    currentId: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    matchId: {
        type: Sequelize.INTEGER,
        primaryKey: true
    }
});

module.exports = Seen;
