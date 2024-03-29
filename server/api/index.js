const router = require('express').Router();

module.exports = router;

router.use('/user', require('./user'));
router.use('/match', require('./match'));
router.use('/buds', require('./buds'));
router.use('/seen', require('./seen'));


router.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});
