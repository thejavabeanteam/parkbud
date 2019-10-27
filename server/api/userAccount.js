const router = require('express').Router();
module.exports = router;

// get a single user (to set them as current user on state)
router.get('/:userId', (req, res, next) => {
    // find the user with the given userId
});

// update a user's profile
router.put('/:userId', (req, res, next) => {
    // replace the given user's info with the updated info
});

//delete a user
router.delete('/:userId', (req, res, next) => {
    // destory the given user
});

