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
    User.findByPk(req.params.userId)
        .then(user => res.json(user))
        .catch(next)
});

//update a user's profile
router.put('/:userId', (req, res, next) => {
    User.findByPk(req.params.userId)
        .then(user => {
            user.update(req.body)
                .then(editedUser => res.json(editedUser))
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
        .then(days => res.json(days))
        .catch(next)
});

//add an entry to a user's schedule
router.post('/schedule/day/:userId', (req, res, next) => {
    Day.findOrCreate({
        where: {
            userId: req.params.userId,
            dayOfWeek: req.body.dayOfWeek,
            arrival: req.body.arrival,
            departure: req.body.departure,
            earliest: req.body.earliest
        }
    })
        .then(day => res.json(day))
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
                .then(editedDay => res.json(editedDay))
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

//delete an entry from the user's schedule
// router.delete('/schedule/day/:userId', (req, res, next) => {
//     Day.destroy({
//         where: {
//             userId: req.params.userId,
//             dayOfWeek: req.body.dayOfWeek
//         }
//     })
//         .then(() => res.sendStatus(204))
//         .catch(next)
// });

// VEHICLE

//get a user's vehicle
router.get('/vehicle/:userId', (req, res, next) => {
    Vehicle.findOne({
        where: {
            ownerId: req.params.userId
        }
    })
        .then(vehicle => res.json(vehicle))
        .catch(next)
});

//add a user's vehicle
router.post('/vehicle/:userId', (req, res, next) => {
    Vehicle.findOrCreate({
        where: {
            ownerId: req.params.userId,
            color: req.body.color,
            model: req.body.model,
            make: req.body.make,
            year: req.body.year
        }
    })
        .then(vehicle => res.json(vehicle))
        .catch(err => console.log(err))
});

//update a user's vehicle
router.put('/vehicle/:userId', (req, res, next) => {
    Vehicle.findOne({
        where: {
            ownerId: req.params.userId
        }
    })
        .then(vehicle => {
            vehicle.update(req.body)
                .then(editedVehicle => res.json(editedVehicle))
        })
        .catch(next)
});

//delete a user's vehicle
router.delete('/vehicle/:userId', (req, res, next) => {
    Vehicle.destroy({
        where: {
            ownerId: req.params.userId,
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
            ownerId: req.params.userId,
        }
    })
        .then(vehicle => ParkingSpot.findOne({
            where: {
                ownerId: vehicle.ownerId
            }
        })
            .then(spot => res.json(spot)))
        .catch(err => console.log(err))
});

//get the google maps view of the given pindrop
router.get('/vehicle/spot/', (req, res, next) => {
    const pindrop = req.query.pindrop;
    const targetUrl = "https://plus.codes/api?encryptkey=" + GOOGLE_GEO_API_KEY +  "&address=" + pindrop;

    axios.get(targetUrl).then(payload => {
        let pindropLink = "https://plus.codes/" + payload.data.plus_code.global_code
    })

});

//add an occupied spot
router.post('/vehicle/spot/:userId', (req, res, next) => {
    ParkingSpot.findOrCreate({
        where: {
            ownerId: req.params.userId,
            parkingLot: req.body.parkingLot,
            school: req.body.school,
            pindrop: req.body.pindrop
        }
    })
        .then(spot => res.json(spot))
        .catch(err => console.log(err))
});

//update info about a spot
router.put('/vehicle/spot/:userId', (req, res, next) => {
    Vehicle.findOne({
        where: {
            ownerId: req.params.userId,
        }
    })
        .then(vehicle => ParkingSpot.findOne({
            where: {
                ownerId: vehicle.ownerId
            }
        }).then(spot => {
            spot.update(req.body)
                .then(editedSpot => res.json(editedSpot))

        }))
        .catch(next)
});

//remove a parking spot
router.delete('/vehicle/spot/:userId', (req, res, next) => {
    Vehicle.findOne({
        where: {
            ownerId: req.params.userId,
        }
    }).then(vehicle => ParkingSpot.destroy({
        where: {
            ownerId: vehicle.ownerId
        }
    }).then(() => res.sendStatus(204)))
        .catch(next)
});
