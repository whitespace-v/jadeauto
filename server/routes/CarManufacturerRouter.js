const Router = require('express')
const router = new Router()
const ManufacturerController = require('../controllers/ManufacturerController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/',checkRole('ADMIN'),ManufacturerController.create)  //create cars Manufacturer
router.get('/',ManufacturerController.getAll)           //get cars Manufacturer
router.delete('/:id', checkRole("ADMIN"), ManufacturerController.delete);
module.exports = router