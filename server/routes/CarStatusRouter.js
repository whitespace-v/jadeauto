const Router = require('express')
const router = new Router()
const CarStatusController = require('../controllers/CarStatusController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'),CarStatusController.create)
router.get('/', CarStatusController.getAll)
router.delete('/:id', checkRole("ADMIN"), CarStatusController.delete);
module.exports = router