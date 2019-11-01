const Sequelize =  require('sequelize');
const db = require('../db');


const Seen = db.define('seen', {
    userID: {
        type: Sequelize.INTEGER,
    }
});

module.exports = Seen;