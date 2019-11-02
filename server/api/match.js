const router = require('express').Router();
const {Match} = require('../db/models');

module.exports = router;

//Get all matches belonging to the logged-in user
// requires the user to be logged in so the currentUser's id can be passed to req.body for post
router.get('/:userId', (req, res, next) => {
    Match.findAll({
        where: {
            currentId: req.params.userId
        }
    })
        .then(matches => res.json(matches))
        .catch(next)
});

//Add a match to the logged-in user
router.post('/', (req, res, next) => {
    Match.findOrCreate({
        where: {
            currentId: req.body.currentId,
            matchId: req.body.matchId
        }
    }).then(Match.findOrCreate({
        where: {
            currentId: req.body.matchId,
            matchId: req.body.currentId
        }
    }))
        .then((newMatch) => res.json(newMatch[0]))
        .catch(err => console.log(err))
});

// on Contact set the match.contacted to true
router.put('/:currentId/:matchId', (req, res, next) => {
    Match.update({contacted: true}, {
        where: {
            currentId: req.params.currentId,
            matchId: req.params.matchId
        }
    })
        .then(result => res.json(result))
});

// Delete a match
router.delete('/', (req, res, next) => {
    Match.destroy({
        where: {
            currentId: req.body.currentId,
            matchId: req.body.matchId
        }
    }).then(Match.destroy({
            where: {
                currentId: req.body.matchId,
                matchId: req.body.currentId
            }
        }))
        .then(() => res.sendStatus(204))
        .catch(next)
});
