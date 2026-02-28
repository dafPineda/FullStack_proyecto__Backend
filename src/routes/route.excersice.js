const express = require('express');
const router = express.Router()
const controller = require('../controllers/controller.excersice');

router.get('/', controller.getAll)
router.get('/muscle', controller.getByMuscle)
module.exports = {router}