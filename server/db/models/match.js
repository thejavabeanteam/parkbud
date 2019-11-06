const Sequelize = require('sequelize');
const db = require('../db');

const Match = db.define('match', {
    currentId: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    matchId: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    contacted: {
        type: Sequelize.BOOLEAN
    },

});

module.exports = Match;
