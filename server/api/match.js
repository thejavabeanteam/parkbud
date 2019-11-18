const router = require('express').Router();
const {Match, User, Day, ParkingSpot, Vehicle} = require('../db/models');

module.exports = router;

//Get all matches belonging to the logged-in user
// requires the user to be logged in so the currentUser's id can be passed to req.body for post
router.put('/', (req, res, next) => {
    User.findByPk(req.body.userId).then(user => !user ? res.status(401).send('Invalid user id provided') : null);

    Match.findAll({
        where: {
            currentId: req.body.userId
        }
    })
        .then(matches => matches.map(match => {
            User.findAll({
                where: {
                    id: match.matchId
                },
                include: [{model: Day}, {model: Vehicle}, {model: ParkingSpot}]
            })
                .then(buds => {
                    if (!buds) {
                        res.status(401).send('Invalid user id provided')
                    } else {
                        res.status(200).json(buds)
                    }
                })
                .catch(next)
        }))
        .catch(next);
});

//Add a match to the logged-in user
router.post('/', (req, res, next) => {
    Match.findOrCreate({
        where: {
            currentId: req.body.matchId,
            matchId: req.body.userId
        }
    }).then(Match.findOrCreate({
        where: {
            currentId: req.body.userId,
            matchId: req.body.matchId
        }
    }))
        .then(newMatch => res.status(200).json(newMatch))
        .catch(err => console.log(err))
});

// Delete a match
router.post('/delete', (req, res, next) => {
    console.log(req.body);
    Match.destroy({
        where: {
            currentId: req.body.userId,
            matchId: req.body.matchId
        }
    }).then(Match.destroy({
        where: {
            currentId: req.body.matchId,
            matchId: req.body.userId
        }
    }))
        .then(() => res.sendStatus(204))
        .catch(next)
});