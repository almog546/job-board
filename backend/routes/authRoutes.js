const express = require('express');
const router = express.Router();
const prisma = require('../prismaClient');
const bcrypt = require('bcrypt');
const { signup, login, me } = require('../controllers/authController');

router.post('/signup', signup);
router.post('/login', login);
router.get('/me', me);

module.exports = router;
