const express = require('express');

const router = express.Router();

const {
    jobs,
    jobById,
    addjobtoFavorites,
} = require('../controllers/jobsController');
const requireAuth = require('../middlewares/requireAuth');
const {
    requireEmployer,
    newrequireEmployer,
} = require('../middlewares/requiretypeofrole');
const { createJob } = require('../controllers/createJobController');
const { myjobs } = require('../controllers/myjobsController');
const { deleteJob } = require('../controllers/deleteJobController');

router.get('/', jobs);
router.get('/me', newrequireEmployer, myjobs);
router.get('/:id', jobById);

router.post('/', requireEmployer, createJob);
router.post('/:id', requireAuth, addjobtoFavorites);

router.delete('/:id', requireEmployer, deleteJob);

module.exports = router;
