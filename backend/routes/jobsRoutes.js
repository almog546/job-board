const express = require('express');

const router = express.Router();

const {
    jobs,
    jobById,
    addjobtoFavorites,
} = require('../controllers/jobsController');
const requireAuth = require('../middlewares/requireAuth');

router.get('/jobs', jobs);
router.get('/jobs/:id', jobById);
router.post('/jobs/:id', requireAuth, addjobtoFavorites);
module.exports = router;
