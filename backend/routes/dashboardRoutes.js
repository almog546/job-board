const express = require('express');
const router = express.Router();

const requireAuth = require('../middlewares/requireAuth');
const {
    requireEmployer,
    requireJobSeeker,
} = require('../middlewares/requiretypeofrole');

router.get('/Dashboard', requireAuth, requireEmployer, (req, res) => {
    res.json({ message: 'Welcome to the employer dashboard!' });
});

router.get('/favorites', requireAuth, requireJobSeeker, (req, res) => {
    res.json({ message: 'Welcome to the job seeker favorites!' });
});

module.exports = router;
