const router = require('express').Router();
const {Seen, User, Day, Vehicle, ParkingSpot} = require('../db/models');
module.exports = router;

// Get all Seens belonging to the logged-in user
// requires the user to be logged in so the currentUser's id can be passed to req.body for post
router.get('/', (req, res, next) => {
    Seen.findAll({
        where: {
            currentId: req.body.userId
        },
        include: [{model: Day}, {model: Vehicle}, {model: ParkingSpot}]
    })
        .then(seens => seens.map(seen => {
            if (!seens) {
                res.status(401).send('Invalid user id provided')
            } else {

                User.findAll({
                    where: {
                        id: seen.matchId
                    }
                })
                    .then(profiles => {
                        res.json(profiles);
                        res.status(200).json(seens);
                    })
            }
        }))
        .catch(next)
});

// Add a Seen to a logged-in user
router.post('/', (req, res, next) => {
    Seen.findOrCreate({
        where: {
            currentId: req.body.userId,
            matchId: req.body.matchId
        }
    })
        .then(seen => {
            if (!seen) {
                res.status(401).send('Invalid user id provided')
            } else {
                res.status(200).json(seen)
            }
        })
        .catch(next)
});
