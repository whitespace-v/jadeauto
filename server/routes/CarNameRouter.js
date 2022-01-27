const Router = require('express')
const router = new Router()
const CarNameController = require('../controllers/CarNameController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/',checkRole('ADMIN'),CarNameController.create)
router.get('/',CarNameController.getAll)
router.delete('/:id', checkRole("ADMIN"), CarNameController.delete);
module.exports = router