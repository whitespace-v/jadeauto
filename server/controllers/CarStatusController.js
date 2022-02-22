const {CarStatus} = require("../models/models");           //import API errors

class CarStatusController {
    async create(req,res){                                      //create car Name
        const {name} = req.body                                  //extract name of Name from json post request
        const carStatus = await CarStatus.create({name})                       //async create manufacturer with {name} in db
        return res.json(carStatus)                                       //return Name in json
    }
    async getAll(req,res){                         //get Name
        const carStatuses = await CarStatus.findAll()          //find all names
        return res.json(carStatuses)                              //return all Names in json
    }
    async delete(req,res){
        try{
            const {id} = req.params;
            await CarStatus.findOne({where: {id}})
                .then( async data => {
                    if (data) {
                        await CarStatus
                            .destroy({where: {id}})
                            .then(() => {
                                return res.json('CarStatusController deleted')
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

module.exports = new CarStatusController()