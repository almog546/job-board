const express = require('express');

const router = express.Router();
const requireAuth = require('../middlewares/requireAuth');
const { requireJobSeeker } = require('../middlewares/requiretypeofrole');
const { favoritejobs } = require('../middlewares/requireuserfave');
const { showfavorites } = require('../controllers/favoritesController');

router.get(
    '/favorites',
    requireAuth,
    requireJobSeeker,
    favoritejobs,
    showfavorites
);

module.exports = router;
