const router = require('express').Router();

module.exports = router;

router.get('/:userId', (req, res, next) => {
    // Get all matches belonging to the logged-in user--
    // requires the user to be logged in so the currentUser's id can be passed to req.body
});

router.post('/', (req, res, next) => {
    // Add a match to a logged-in user
});


router.put('/:userId/:petId', (req, res, next) => {
    // on Contact set the match.contacted to true
});

router.delete('/', (req, res, next) => {
    // Delete a match
});
