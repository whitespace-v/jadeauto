const Router = require('express')
const router = new Router()
const CarController = require('../controllers/CarController')
const checkRole = require("../middleware/checkRoleMiddleware");

router.post('/' ,checkRole('ADMIN'),CarController.create)  //create car
router.get('/', CarController.getAll)        //get all cars
router.get('/:id', CarController.getOne)     //get one car
router.delete('/:id', checkRole("ADMIN"), CarController.delete)
router.put('/:id', checkRole("ADMIN"), CarController.update)
module.exports = router