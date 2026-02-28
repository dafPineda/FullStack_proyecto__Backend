const express = require('express');
const controller = require('../controllers/controller.users');
const { authMiddleware, requireRole } = require('../auth');

const router = express.Router();

router.post('/create', authMiddleware, requireRole('admin'), controller.create)
router.post('/login', controller.logInUser)

module.exports = { router }  