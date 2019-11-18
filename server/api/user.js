const router = require('express').Router();
const axios = require('axios');
const {User, Day, Vehicle, ParkingSpot} = require('../db/models');

const {
    GOOGLE_GEO_API_KEY
} = require('../../secrets');

module.exports = router;

// USER

//get a single user
router.get('/:userId', (req, res, next) => {
    User.findByPk(req.params.userId, {
        include: [{model: Day}, {model: Vehicle}, {model: ParkingSpot}]
    })
        .then(user => {
            if (!user) {
                res.status(401).send('User not found')
            } else {
                res.status(200).json(user)
            }
        })
        .catch(next)
});

//update a user's profile
router.put('/:userId', (req, res, next) => {
    User.findByPk(req.params.userId)
        .then(user => {
            if (!user) {
                res.status(401).send('User not found')
            } else {
                user.update(req.body)
                    .then(editedUser => res.status(200).json(editedUser))
            }
        })
        .catch(next)
});

//delete a user
router.delete('/:userId', (req, res, next) => {
    User.destroy({
        where: {
            id: req.params.userId
        }
    })
        .then(() => res.sendStatus(204))
        .catch(next)
});

// SCHEDULE

//get a user's schedule
router.get('/schedule/:userId', (req, res, next) => {
    Day.findAll({
        where: {
            userId: req.params.userId,
        }
    })
        .then(days => {
            if (!days) {
                res.status(401).send('Invalid user id was provided')
            } else {
                res.status(200).json(days)
            }
        })
        .catch(next)
});

//delete a user's whole schedule
router.delete('/schedule/:userId', (req, res, next) => {
    Day.findAll({
        where: {
            userId: req.params.userId,
        }
    }).then(days => days.map(day =>
        Day.destroy({
            where: {
                userId: day.userId
            }
        })
            .then(() => res.sendStatus(204))
    ))
        .catch(next)
});

//add an entry to a user's schedule
router.post('/schedule/day/:userId', (req, res, next) => {
    Day.findOrCreate({
        where: {
            userId: req.params.userId,
            dayOfWeek: req.body.dayOfWeek,
            departure: req.body.departure,
        }
    })
        .then(day => res.status(200).json(day))
        .catch(err => console.log(err))
});

//update a user's schedule entry
router.put('/schedule/day/:userId', (req, res, next) => {
    Day.findOne({
        where: {
            userId: req.params.userId,
            dayOfWeek: req.body.dayOfWeek
        }
    })
        .then(day => {
            day.update(req.body)
                .then(editedDay => res.status(200).json(editedDay))
        })
        .catch(next)
});

//delete an entry from the user's schedule
router.post('/schedule/day/delete/:userId', (req, res, next) => {
    Day.destroy({
        where: {
            userId: req.params.userId,
            dayOfWeek: req.body.dayOfWeek
        }
    })
        .then(() => res.sendStatus(204))
        .catch(next)
});

// VEHICLE

//get a user's vehicle
router.get('/vehicle/:userId', (req, res, next) => {
    Vehicle.findOne({
        where: {
            userId: req.params.userId
        }
    })
        .then(vehicle => {
            if (!vehicle) {
                res.status(401).send('Invalid user id provided')
            } else {
                res.status(200).json(vehicle)
            }
        })
        .catch(next)
});

//add a user's vehicle
router.post('/vehicle/:userId', (req, res, next) => {
    Vehicle.findOrCreate({
        where: {
            userId: req.params.userId,
            color: req.body.color,
            model: req.body.model,
            make: req.body.make,
            year: req.body.year
        }
    })
        .then(vehicle => {
            if (!vehicle) {
                res.status(401).send('Invalid user id provided')
            } else {
                res.status(200).json(vehicle)
            }
        })
        .catch(err => console.log(err))
});

//update a user's vehicle
router.put('/vehicle/:userId', (req, res, next) => {
    Vehicle.findOne({
        where: {
            userId: req.params.userId
        }
    })
        .then(vehicle => {
            if (!vehicle) {
                res.status(401).send('Invalid user id provided')
            } else {
                vehicle.update(req.body)
                    .then(editedVehicle => {
                        res.status(200).json(editedVehicle)
                    })
            }
        })
        .catch(next)
});

//delete a user's vehicle
router.delete('/vehicle/:userId', (req, res, next) => {
    Vehicle.destroy({
        where: {
            userId: req.params.userId,
        }
    })
        .then(() => res.sendStatus(204))
        .catch(next)
});

// PARKING SPOT

//get a parked user's spot
router.get('/vehicle/spot/:userId', (req, res, next) => {
    Vehicle.findOne({
        where: {
            userId: req.params.userId,
        }
    })
        .then(vehicle => ParkingSpot.findOne({
            where: {
                userId: vehicle.userId
            }
        })
            .then(spot => {
                //get the google maps view of the given pindrop
                const pindrop = spot.pindrop;
                const targetUrl = "https://plus.codes/api?encryptkey=" + GOOGLE_GEO_API_KEY + "&address=" + pindrop;

                axios.get(targetUrl).then(payload => {
                    let pindropLink = "https://plus.codes/" + payload.data.plus_code.global_code
                });

                res.status(200).json(spot)
            }))
        .catch(err => console.log(err))
});

//add an occupied spot
router.post('/vehicle/spot/:userId', (req, res, next) => {
    ParkingSpot.findOrCreate({
        where: {
            userId: req.params.userId,
            parkingLot: req.body.parkingLot,
            school: req.body.school,
            pindrop: req.body.pindrop
        }
    })
        .then(spot => res.status(200).json(spot))
        .catch(err => console.log(err))
});

//update info about a spot
router.put('/vehicle/spot/:userId', (req, res, next) => {
    Vehicle.findOne({
        where: {
            userId: req.params.userId,
        }
    })
        .then(vehicle => ParkingSpot.findOne({
            where: {
                userId: vehicle.userId
            }
        }).then(spot => {
            spot.update(req.body)
                .then(editedSpot => res.status(200).json(editedSpot))

        }))
        .catch(next)
});

//remove a parking spot
router.delete('/vehicle/spot/:userId', (req, res, next) => {
    Vehicle.findOne({
        where: {
            userId: req.params.userId,
        }
    }).then(vehicle => ParkingSpot.destroy({
        where: {
            userId: vehicle.userId
        }
    }).then(() => res.sendStatus(204)))
        .catch(next)
});
