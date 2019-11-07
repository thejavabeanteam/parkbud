const router = require('express').Router();
// import User model once created
const User = require('../db/');

module.exports = router;



// add routing for /login
router.post('/login', (req, res, next) => {

    User.findOne({where: {email: req.body.email}})
        .then(user => {
            if (!user) {
                res.status(401).send('User not found')
            } else if (!user.correctPassword(req.body.password)) {
                res.status(401).send('Incorrect password')
            } else {
                req.login(user, err => (err ? next(err) : res.json(user)))
            }
        })
        .catch(next)
})

// add routing for /signup
router.post('/signup', (req, res, next) => {
    User.create(req.body)
        .then(user => {
            req.login(user, err => (err ? next(err) : res.json(user)))
        })
        .catch(err => {
            if (err.name === 'SequelizeUniqueConstraintError') {
                res.status(401).send('User already exists')
            } else {
                next(err)
            }
        })
})


// add routing for /logout
router.post('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
})


// add routing for /me
router.get('/me', (req, res) => {
    res.json(req.user)
})

router.use('/google', require('./google'))
router.use('/facebook', require('./facebook'));

