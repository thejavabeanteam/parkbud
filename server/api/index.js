const router = require('express').Router();

module.exports = router;

router.use('/userAccount', require(' ./userAccount'));

router.use('/match', require('./match'));
router.use('/buds', require('./buds'));
router.use('/seen', require('./seen'));
router.use('/message', require('./message'));

router.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});
