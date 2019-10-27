const router = require('express').Router();

module.exports = router;

router.get('/:userId/:petId', (req, res, next) => {
    // Get all Seens belonging to the logged-in user--
    // requires the user to be logged in so the currentUser's id can be passed to req.body

});

router.post('/', (req, res, next) => {
    // Add a Seen to a logged-in user--
    // expects an object with currentUser's id and seen user's id
});
