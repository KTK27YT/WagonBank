const express = require('express');
const router = require('./cards');



router.get('/ping', (req, res) => {
    res.send('pong');
});

module.exports = router;