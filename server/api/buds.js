const router = require('express').Router();

module.exports = router;

router.get('/', (req, res, next) => {
    // use a query string/user pref's to display all buds with matching schedule
    // and matching parking lot preference
});

router.get('/findById/:userId', (req, res, next) => {
    // view a user's profile
});