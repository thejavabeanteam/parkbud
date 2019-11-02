const router = require('express').Router();
const {Seen} = require('../db/models');
module.exports = router;

//Get all Seens belonging to the logged-in user-- requires the user to be logged in so the currentUser's id can be passed to req.body
router.put('/:currentId/:matchId', (req, res, next) => {
    /*
    route format:
      `.../api/match/${currentId}/${matchId}`
    */
    Seen.findAll({
        where: {
            currentId: req.body.currentId,
            matchId: req.body.matchId
        }
    })
        .then(seens => res.json(seens))
        .catch(next)
});

//Add a Seen to a logged-in user-- expects an object with petId and userId
router.post('/', (req, res, next) => {
    Seen.create({
        currentId: req.body.currentId,
        matchId: req.body.matchId
    })
        .then(seen => res.json(seen.data))
        .catch(err => console.log(err))
});
