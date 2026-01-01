const express = require('express');

const router = express.Router();

const {
    jobs,
    jobById,
    addjobtoFavorites,
} = require('../controllers/jobsController');
const requireAuth = require('../middlewares/requireAuth');
const { requireEmployer } = require('../middlewares/requiretypeofrole');
const { createJob } = require('../controllers/createJobController');

router.get('/jobs', jobs);
router.get('/jobs/:id', jobById);

router.post('/jobs', requireEmployer, createJob);
router.post('/jobs/:id', requireAuth, addjobtoFavorites);

module.exports = router;
