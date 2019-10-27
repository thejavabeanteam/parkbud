const router = require('express').Router();
// install socket.io here?

module.exports = router;

router.get('/:userId', (req, res) => {
    // send a message to specific user
    // incorporate socket.broadcast.to(socketid).emit('message', 'for your eyes only');
    // figure out how to connect userId and socketid
});
