const {CarName} = require('../models/models')          //import name db model by destructuring
const ApiError = require('../error/ApiError')           //import API errors

class CarNameController {
    async create(req,res){                                      //create car Name
        const {name} = req.body                                  //extract name of Name from json post request
        const carName = await CarName.create({name})                       //async create manufacturer with {name} in db
        return res.json(carName)                                       //return Name in json
    }
    async getAll(req,res){                         //get Name
        const carNames = await CarName.findAll()          //find all names
        return res.json(carNames)                              //return all Names in json
    }
    async delete(req,res){
        try{
            const {id} = req.params;
            await CarName.findOne({where: {id}})
                .then( async data => {
                    if (data) {
                        await CarName
                            .destroy({where: {id}})
                            .then(() => {
                                return res.json('CarName deleted')
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

module.exports = new CarNameController()