const express = require('express');
const router = express.Router()
const controller = require('../controllers/controller.instructors');
const { authMiddleware, requireRole } = require('../auth');

router.get('/', controller.getActive)
router.get('/paginated', controller.getPaginated)
router.get('/getAll', controller.getAll)
router.get('/:id', controller.getById)

router.post('/create', authMiddleware, requireRole('admin'), controller.create)

router.put('/:id',authMiddleware, requireRole('admin'), controller.edit)
router.put('/active/:id', authMiddleware, requireRole('admin'), controller.changeActive)

router.delete('/:id', authMiddleware, requireRole('admin'), controller.remove)


module.exports = {router} 