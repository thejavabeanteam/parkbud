const User = require('./user');
const Vehicle = require('./vehicle');
const Day = require('./day');
const Match = require('./match');
const Seen = require('./seen');
const ParkingSpot = require('./parkingSpot');

User.hasMany(Day, {constraints: false});

module.exports = {
    User,
    Match,
    Seen,
    Vehicle,
    ParkingSpot,
    Day
};
