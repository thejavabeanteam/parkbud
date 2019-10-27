const router = require('express').Router();
module.exports = router;

router.get('/:userId', (req, res, next) => {
    // get a single user (to set them as current user on state)
});

router.put('/:userId', (req, res, next) => {
    // replace the given user's info with the updated info
});

router.delete('/:userId', (req, res, next) => {
    // delete a user
});

