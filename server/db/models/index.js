const User = require('./user');
const Vehicle = require('./vehicle');
const Day = require('./day');
const Match = require('./match');
const Seen = require('./seen');
const ParkingSpot = require('./parkingSpot');

User.hasMany(Day, {constraints: false});
User.hasOne(Vehicle, {constraints: false});
User.hasOne(ParkingSpot, {constraints: false});

module.exports = {
    User,
    Match,
    Seen,
    Vehicle,
    ParkingSpot,
    Day
};
