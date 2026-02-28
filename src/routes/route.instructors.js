const express = require('express');
const router = express.Router()
const controller = require('../controllers/controller.instructors');
const { authMiddleware, requireRole } = require('../auth');

router.get('/', controller.getActive)
router.get('/paginated', controller.getPaginated)
router.get('/getAll', controller.getAll)
router.get('/:id', controller.getById)

router.post('/create', authMiddleware, requireRole('admin'), controller.create)

router.put('/:id', controller.edit)
router.put('/active/:id', controller.changeActive)

router.delete('/:id', controller.remove)


module.exports = {router} 