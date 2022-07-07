//main router
const router = require('express').Router()  //create router from express

//import under-routers
const carRouter = require('./CarRouter')
const userRouter = require('./UserRouter')
const carActiveRouter = require('./CarActiveRouter')
const manufacturerRouter = require('./CarManufacturerRouter')
const carNameRouter = require('./CarNameRouter')
const carStatusRouter = require('./CarStatusRouter')
//under-routers
router.use('/user', userRouter) // router urls, router
router.use('/carname', carNameRouter)
router.use('/manufacturer', manufacturerRouter)
router.use('/carstatus', carStatusRouter)
router.use('/caractive', carActiveRouter)
router.use('/car', carRouter)

module.exports = router //export router