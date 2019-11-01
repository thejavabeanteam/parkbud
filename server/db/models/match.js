const Sequelize =  require('sequelize');
const db = require('../db');

const match = db.define('match',{
    userID: {
        type: Sequelize.INTEGER,
    },

    contacted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }

});

module.exports = Match;