const router = require('express').Router();
const Op = require('sequelize').Op;
const {User, Day} = require('../db/models');

module.exports = router;

// gets all buds with a complimentary schedule and matching parking preference
router.get('/:userId', (req, res, next) => {
    User.findAll({
        include: [{
            model: Day,
            where: {
                dayOfWeek: {
                    [Op.eq]: req.body.dayOfWeek
                },
                departure: {
                    [Op.gte]: req.body.earliest,
                    [Op.lte]: req.body.arrival
                }
            }
        }],
        where: {
            id: {
                [Op.ne]: req.params.userId
            },
            parkingPreferences: {
                [Op.overlap]: req.body.parkingPreferences
            }
        }
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

// gets all buds with given preferences
router.get('/:userId/filter', (req, res, next) => {
    User.findAll({
        include: [{
            model: Day,
            where: {
                dayOfWeek: {
                    [Op.eq]: req.body.dayOfWeek
                },
                departure: {
                    [Op.gte]: req.body.earliest,
                    [Op.lte]: req.body.arrival
                }
            }
        }],
        where: {
            id: {
                [Op.ne]: req.params.userId
            },
            parkingPreferences: {
                [Op.overlap]: req.body.parkingPreferences
            },
            gender: {
                [Op.in]: req.body.gender
            }
        }
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