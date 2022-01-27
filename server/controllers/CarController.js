const uuid = require('uuid')                            //import unique ids
const path = require('path')                              //import path
const {Car, CarImages} = require('../models/models')          //import Car and car_info db models
const ApiError = require('../error/ApiError')                 //import API errors
const fs = require('fs')
const sequelize  = require('../db')
class CarController {
    async create(req,res,next){                                 //create car
        try{
            let {nameName, manufacturerName, price, manufacturerId,
                carNameId, year, motor, drive, mileage, city, date,
                status, bodyNumber, description } = req.body

            const {video, image, images} = req.files;                                                                 //request video
            let videoName = uuid.v4() + '.mp4';                                                           //generate unique filename
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
            return res.json(car)                        //return json result
        } catch (e){
            next(ApiError.badRequest(e.message))        //if error trigger badRequest
        }
    }

    async getAll(req, res){                                          //get all and get filtered (by need) by manufacturer
        let {manufacturerId, carNameId, limit, page} = req.query
        page = page || 1
        limit = limit || 100
        let offset = page * limit - limit                                 //skip limit cars on next page
        let cars;
        if (!manufacturerId && !carNameId){                                          //get all
            cars = await Car.findAndCountAll({limit, offset, order: sequelize.literal('id DESC')})   //Descending order !
        }
        if (manufacturerId && !carNameId){                                                          //filtering by manufacturer
            cars = await Car.findAndCountAll({where: {manufacturerId}, limit, offset, order: sequelize.literal('id DESC')})
        }
        if (!manufacturerId && carNameId){                                          //filtering by car name
            cars = await Car.findAndCountAll({where: {carNameId}, limit, offset, order: sequelize.literal('id DESC')})
        }
        if (manufacturerId && carNameId){                                           //filtering by car name and manufacturer
            cars = await Car.findAndCountAll({where: {carNameId,manufacturerId}, limit, offset, order: sequelize.literal('id DESC')})
        }
        return res.json(cars)
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
                        //delete video
                        fs.unlinkSync(path.resolve(__dirname, '..', 'static', data.dataValues.video))
                        //delete main image
                        fs.unlinkSync(path.resolve(__dirname, '..', 'static', data.dataValues.image))
                        await CarImages.findAll({where: {carId: id}})
                            .then(data => {
                                if (data) {
                                    try {
                                        for (let i = 0; i < data.length; i++) {
                                            //delete all another images
                                            fs.unlinkSync(path.resolve(__dirname, '..', 'static', data[i].dataValues.img))
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
                .then( async data => {
                    if(data) {
                        await Car.update({status: req.body.status}, {where:{id}})
                            .then(() => {
                                return res.json("Car updated")
                            })
                    } else {
                        return res.json("This Car doesn't exist in DB");
                    }
                })
        } catch (e) {
            return res.json(e);
        }
    }
}

module.exports = new CarController()
