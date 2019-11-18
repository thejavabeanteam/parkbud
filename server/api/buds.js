const router = require('express').Router();
const Op = require('sequelize').Op;
const {User, Day, Vehicle, ParkingSpot} = require('../db/models');

module.exports = router;

// gets all buds with a complimentary schedule and matching parking preference
router.post('/', (req, res, next) => {
    User.findByPk(req.body.userId).then(user => !user ? res.status(401).send('Invalid user id provided') : null);

    User.findAll({
        where: {
            id: {
                [Op.ne]: req.body.userId
            },
            parkingPreferences: {
                [Op.overlap]: req.body.parkingPreferences
            }
        },
        include: [{
            model: Day,
            where: {
                dayOfWeek: {
                    [Op.eq]: req.query.dayOfWeek
                },
                departure: {
                    [Op.gte]: req.query.earliest,
                    [Op.lte]: req.query.arrival
                }
            }
        }, {model: Vehicle}, {model: ParkingSpot}]
    })
        .then(buds => {
            if (!buds) {
                res.status(401).send('Invalid user id provided')
            } else {
                res.status(200).json(buds)
            }
        })
        .catch(next)
});