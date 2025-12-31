const express = require('express');

const router = express.Router();
const requireAuth = require('../middlewares/requireAuth');
const { requireJobSeeker } = require('../middlewares/requiretypeofrole');
const { favoritejobs } = require('../middlewares/requireuserfave');
const {
    showfavorites,
    deletefavoritejob,
} = require('../controllers/favoritesController');

router.get('/', requireAuth, requireJobSeeker, favoritejobs, showfavorites);
router.delete(
    '/:jobId',
    requireAuth,
    requireJobSeeker,
    favoritejobs,
    deletefavoritejob
);

module.exports = router;
