//main router
const router = require('express').Router()  //create router from express

    //import under-routers
const carRouter = require('./CarRouter')
const userRouter = require('./UserRouter')
const manufacturerRouter = require('./CarManufacturerRouter')
const carNameRouter = require('./CarNameRouter')

    //under-routers
router.use('/user', userRouter) // router urls, router
router.use('/carname', carNameRouter)
router.use('/manufacturer', manufacturerRouter)
router.use('/car', carRouter)

module.exports = router //export router