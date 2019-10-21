const router = require('express').Router();

module.exports = router;

// register the api routes once they're created

router.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});
