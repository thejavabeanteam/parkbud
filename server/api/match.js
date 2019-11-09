const router = require('express').Router();
const {Match, User} = require('../db/models');

module.exports = router;

//Get all matches belonging to the logged-in user
// requires the user to be logged in so the currentUser's id can be passed to req.body for post
router.get('/:userId', (req, res, next) => {
    Match.findAll({
        where: {
            currentId: req.params.userId
        }
    })
        .then(matches => matches.map(match => {
            if (!matches) {
                res.status(401).send('Invalid user id provided')
            } else {

                User.findAll({
                    where: {
                        id: match.matchId
                    }
                })
                    .then(profiles => {
                        res.json(profiles);
                        res.status(200).json(match);
                    })
            }
        }))
        .catch(next)
});

//Add a match to the logged-in user
router.post('/:userId', (req, res, next) => {
    Match.findOrCreate({
        where: {
            currentId: req.params.userId,
            matchId: req.body.matchId
        }
    })
        .then(newMatch => res.status(200).json(newMatch))
        .catch(err => console.log(err))
});

// on Contact set the match.contacted to true
router.put('/:userId', (req, res, next) => {
    Match.update({contacted: true}, {
        where: {
            currentId: req.params.userId,
            matchId: req.body.matchId
        }
    })
        .then(result => res.status(200).json(result))
});

// Delete a match
router.delete('/:userId', (req, res, next) => {
    Match.destroy({
        where: {
            currentId: req.params.userId,
            matchId: req.body.matchId
        }
    }).then(Match.destroy({
        where: {
            currentId: req.body.matchId,
            matchId: req.params.userId
        }
    }))
        .then(() => res.sendStatus(204))
        .catch(next)
});