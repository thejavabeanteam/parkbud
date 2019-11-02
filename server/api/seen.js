const router = require('express').Router();
const {Seen} = require('../db/models');
module.exports = router;

// Get all Seens belonging to the logged-in user
// requires the user to be logged in so the currentUser's id can be passed to req.body for post
router.get('/:currentId', (req, res, next) => {
    Seen.findAll({
        where: {
            currentId: req.params.currentId}
    })
        .then(seens => res.json(seens))
        .catch(next)
});

// Add a Seen to a logged-in user
router.post('/', (req, res, next) => {
    Seen.create({
        currentId: req.body.currentId,
        matchId: req.body.matchId
    })
        .then(seen => res.json(seen.data))
        .catch(err => console.log(err))
});
