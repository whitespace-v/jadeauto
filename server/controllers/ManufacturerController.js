const {Manufacturer} = require('../models/models')          //import car_manufacturer db model by destructuring
const ApiError = require('../error/ApiError')                       //import API errors

class ManufacturerController {
    async create(req,res){                                                  //create manufacturer
        const {name} = req.body                                            //extract name from json post request
        const manufacturer = await Manufacturer.create({name})            //async create manufacturer with {name} in db
        return res.json(manufacturer)                                    //return created manufacturer in json
    }
    async getAll(req,res){
        const manufacturers = await Manufacturer.findAll()           //async extract all manufacturers from db
        return res.json(manufacturers)                              //return all manufacturers in json
    }
    async delete(req,res){
        try{
            const {id} = req.params;
            await Manufacturer.findOne({where: {id}})
                .then( async data => {
                    if (data) {
                        await Manufacturer
                            .destroy({where: {id}})
                            .then(() => {
                                return res.json('Manufacturer deleted')
                            })
                    } else {
                        return res.json(`Doesn't exist in data base =(`)
                    }
                })
        } catch (e) {
            return res.json(e);
        }
    }
}

module.exports = new ManufacturerController()