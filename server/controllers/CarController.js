const uuid = require('uuid')
const path = require('path')
const {Car, CarImages} = require('../models/models')
const fs = require('fs')
const sequelize  = require('../db')

class CarController {
    async create(req,res,next){
        console.log(req, res, next)
        try{
            let { nameName, manufacturerName, price, manufacturerId,
                carNameId, year, motor, drive, mileage, city, date,
                status, bodyNumber, description } = req.body
            if (city === '')
                city = 'Алматы'
            if (req.files.video) {
                const {video, image, images} = req.files;           //request video
                let videoName = uuid.v4() + '.mp4';                //generate unique filename
                let imgName  = uuid.v4() + '.jpg';
                const car = await Car.create( {nameName, manufacturerName, price, manufacturerId,
                    carNameId, year, motor, drive, mileage, city, date, status, bodyNumber,
                    description, video: videoName, image: imgName})
                    .then(video.mv(path.resolve(__dirname,'..', 'static', videoName)))
                    .then(image.mv(path.resolve(__dirname,'..', 'static', imgName)))
                if (images.length){
                    for (let i = 0; i<images.length;i++) {
                        imgName = uuid.v4() + '.jpg'
                        await images[i].mv(path.resolve(__dirname,'..', 'static', imgName))
                        await CarImages.create({
                            img: imgName,
                            carId: car.id
                        })
                    }
                }
                return res.json(car)                        //return json result on client
            } else {
                const {image, images} = req.files;
                let imgName  = uuid.v4() + '.jpg';
                const car = await Car.create( {nameName, manufacturerName, price, manufacturerId,
                    carNameId, year, motor, drive, mileage, city, date, status, bodyNumber,
                    description, video: 'empty', image: imgName})
                    .then(image.mv(path.resolve(__dirname,'..', 'static', imgName)))
                if (images.length){
                    for (let i = 0; i<images.length;i++) {
                        imgName = uuid.v4() + '.jpg'
                        await images[i].mv(path.resolve(__dirname,'..', 'static', imgName))
                        await CarImages.create({
                            img: imgName,
                            carId: car.id
                        })
                    }

                }
                return res.json(car)                        //return json result on client
            }

        } catch (e){
            // next(ApiError.badRequest(e.message))
            console.log(e.message)
        }
    }

    async getAll(req, res){
        let {manufacturerId, carNameId, city, status, limit, page} = req.query
        if (status === 'Продано')
            status = 'Sold'
        if (status === 'В наличии')
            status = 'Active'
        page = page || 1
        limit = limit || 100
        let offset = page * limit - limit            //skip limit cars on next page
        let cars;
        // carStatusId is actually simple carStatus but no time to redo =_= TODO: redo
        // so Status = city; active is sold or not sold TODO: redo
        /** get all cars **/
        try{
            if (!manufacturerId && !carNameId && !city && !status ){
                cars = await Car.findAndCountAll(
                    {limit, offset, order: sequelize.literal('id DESC')}
                )
            }
            /** filter by manufacturer **/
            if (manufacturerId && !carNameId && !city && !status ){
                cars = await Car.findAndCountAll(
                    {where: { manufacturerId }, limit, offset, order: sequelize.literal('id DESC')}
                )
            }
            /** filter by car name **/
            if (!manufacturerId && carNameId && !city && !status ){
                cars = await Car.findAndCountAll(
                    {where: { carNameId }, limit, offset, order: sequelize.literal('id DESC')}
                )
            }
            /** filtering by car name and manufacturer **/
            if (manufacturerId && carNameId && !city && !status ){
                cars = await Car.findAndCountAll(
                    {where: { carNameId, manufacturerId }, limit, offset, order: sequelize.literal('id DESC')}
                )
            }
            /** filtering by carStatus **/
            if (!manufacturerId && !carNameId && city && !status  ){
                cars = await Car.findAndCountAll(
                    {where: { city }, limit, offset, order: sequelize.literal('id DESC')})
            }
            /** filtering by carStatus and carNameId**/
            if (!manufacturerId && carNameId && city && !status ){
                cars = await Car.findAndCountAll(
                    {where: { carNameId, city }, limit, offset, order: sequelize.literal('id DESC')})
            }
            /** filtering by carStatus and manufacturerId**/
            if (manufacturerId && !carNameId && city && !status ){
                cars = await Car.findAndCountAll(
                    {where: { manufacturerId, city }, limit, offset, order: sequelize.literal('id DESC')})
            }
            if (manufacturerId && carNameId && city && !status ){
                cars = await Car.findAndCountAll(
                    {
                        where: { carNameId, manufacturerId, city },
                        limit, offset, order: sequelize.literal('id DESC')
                    })
            }
            /** with ACTIVE **/
            if (manufacturerId && carNameId && city && status ){ //mnca
                cars = await Car.findAndCountAll(
                    {
                        where: { carNameId, manufacturerId, city, status  },
                        limit, offset, order: sequelize.literal('id DESC')
                    })
            }
            if (!manufacturerId && !carNameId && !city && status ){ //a
                cars = await Car.findAndCountAll(
                    {
                        where: { status  },
                        limit, offset, order: sequelize.literal('id DESC')
                    })
            }
            if (!manufacturerId && !carNameId && city && status ){ //ca
                cars = await Car.findAndCountAll(
                    {
                        where: { city, status  },
                        limit, offset, order: sequelize.literal('id DESC')
                    })
            }
            if (!manufacturerId && carNameId && city && status ){ //cna
                cars = await Car.findAndCountAll(
                    {
                        where: { carNameId, city, status  },
                        limit, offset, order: sequelize.literal('id DESC')
                    })
            }
            if (manufacturerId && !carNameId && city && status ){ //mca
                cars = await Car.findAndCountAll(
                    {
                        where: { manufacturerId , city, status  },
                        limit, offset, order: sequelize.literal('id DESC')
                    })
            }
            if (manufacturerId && carNameId && !city && status ){ //mna
                cars = await Car.findAndCountAll(
                    {
                        where: { manufacturerId , carNameId, status  },
                        limit, offset, order: sequelize.literal('id DESC')
                    })
            }
            if (manufacturerId && !carNameId && !city && status ){ //ma
                cars = await Car.findAndCountAll(
                    {
                        where: { manufacturerId , status  },
                        limit, offset, order: sequelize.literal('id DESC')
                    })
            }
            if (!manufacturerId && carNameId && !city && status ){ //na
                cars = await Car.findAndCountAll(
                    {
                        where: { carNameId , status  },
                        limit, offset, order: sequelize.literal('id DESC')
                    })
            }
            return res.json(cars)
        } catch (e) {
            console.log(e)
        }
    }

    async getOne(req,res){                      //get a car by id
        const {id} = req.params
        const car = await Car.findOne(          //extract a car by id and get info
            {
                where: {id},
                include: [{model: CarImages, as: 'images'}]
            }
        )
        return res.json(car)
    }
    async delete(req, res) {
        try {
            const {id} = req.params;
            await Car.findOne({where:{id}})
                .then( async data => {
                    //delete images
                    if(data) {
                        fs.access(path.resolve(__dirname, '..','static', data.dataValues.video), fs.F_OK, (err) => {
                            //delete video
                            if (err){
                                console.log('No read Access')
                            } else {
                                console.log('deleted')
                                fs.unlinkSync(path.resolve(__dirname, '..', 'static', data.dataValues.video))
                            }})
                        //delete main image
                        fs.access(path.resolve(__dirname, '..','static', data.dataValues.image), fs.F_OK, (err) => {
                            //delete video
                            if (err){
                                console.log('No read Access')
                            } else {
                                console.log('deleted')
                                fs.unlinkSync(path.resolve(__dirname, '..', 'static', data.dataValues.image))
                            }})


                        await CarImages.findAll({where: {carId: id}})
                            .then(data => {
                                if (data) {
                                    try {
                                        for (let i = 0; i < data.length; i++) {
                                            //delete all another images
                                            fs.access(path.resolve(__dirname, '..','static', data[i].dataValues.img), fs.F_OK, (err) => {
                                                if (err){
                                                    console.log('No read Access')
                                                } else {
                                                    console.log('deleted')
                                                    fs.unlinkSync(path.resolve(__dirname, '..', 'static', data[i].dataValues.img))
                                                }})

                                        }
                                    } catch (e) {
                                        console.error(e)
                                    }
                                } else {
                                    console.error('empty data')
                                }
                            })
                        //delete car
                        await Car.destroy({where:{id}}).then(() => {
                            return res.json("Car deleted");
                        })
                        await CarImages.destroy({where: {carId: id}})
                    } else {
                        return res.json("This Car doesn't exist in database");
                    }
                })
        } catch (e) {
            console.error(e)
        }
    }

    async update(req, res) {
        try {
            const {id} = req.params;
            await Car.findOne({where:{id}})
                .then( async () => {
                    if (req.body.status !== 'Sold' && req.body.status !== 'Active') {
                        /** change city **/
                        await Car.update(
                            {city: req.body.status}, {where:{id}}
                        ).then(
                            () => res.json('updated')
                        )
                    } else {
                        /** change active status **/
                        await Car.update(
                            {status: req.body.status}, {where:{id}}
                        ).then(
                            () => res.json('updated')
                        )
                    }
                    if (req.body.price) {
                        await Car.update(
                            {price: req.body.price}, {where:{id}}
                        ).then(
                            () => res.json('updated')
                        )
                    }
                    if (req.body.description) {
                        await Car.update(
                            {description: req.body.description}, {where:{id}}
                        ).then(
                            () => res.json('updated')
                        )

                    }
                    /** change main picture **/
                    console.log(req.body.pictures)
                    if (req.body.pictures) {
                        await Car.update(
                            {image: req.body.main}, {where:{id}}
                        )
                    }
                })

            if (req.body.pictures) {
                /** change pictures order **/
                const {id} = req.params
                try {
                    await CarImages.findAll({where: {carId: id}})
                        .then(data => {
                            for (let i = 0; i < data.length; i++) {
                                CarImages.update({img: req.body.pictures[i]}, {where:{id: req.body.indexes[i]}})
                            }
                        }).finally(
                            () => res.json('updated')
                        )
                } catch (e) {
                    return res.json(e)
                }
            }
        } catch (e) {
            console.log(res.json(e));
        }

    }
}


module.exports = new CarController()
