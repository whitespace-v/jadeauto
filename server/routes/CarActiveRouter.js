const Router = require('express')
const router = new Router()
const CarActiveController = require('../controllers/CarActiveController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'),CarActiveController.create)
router.get('/', CarActiveController.getAll)
router.delete('/:id', checkRole("ADMIN"), CarActiveController.delete);
module.exports = router