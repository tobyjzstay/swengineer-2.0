const express = require('express');
const router = express.Router();

const auth = require('../middleware');

router.get('/auth', auth, function (req, res) {
    res.sendStatus(200);
});

module.exports = router;
