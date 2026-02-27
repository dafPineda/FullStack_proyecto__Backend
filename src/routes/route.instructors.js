const express = require('express');
const router = express.Router()
const controller = require('../controllers/controller.instructors');

router.get('/', controller.getActive)
router.get('/:id', controller.getById)
router.get('/getAll', controller.getAll)

router.post('/create', controller.create)

router.put('/:id', controller.edit)
router.put('/active/:id', controller.changeActive)

router.delete('/:id', controller.remove)

module.exports = {router} 