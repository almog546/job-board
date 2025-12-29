const express = require('express');

const router = express.Router();

const { jobs, jobById } = require('../controllers/jobsController');

router.get('/jobs', jobs);
router.get('/jobs/:id', jobById);
module.exports = router;
