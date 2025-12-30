const express = require('express');
const router = express.Router();

const requireAuth = require('../middlewares/requireAuth');
const { requireEmployer } = require('../middlewares/requiretypeofrole');

router.get('/Dashboard', requireAuth, requireEmployer, (req, res) => {
    res.json({ message: 'Welcome to the employer dashboard!' });
});

module.exports = router;
