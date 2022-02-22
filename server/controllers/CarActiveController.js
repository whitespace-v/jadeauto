const {CarActive} = require('../models/models')          //import name db model by destructuring

class CarActiveController {

    async create(req,res){                                      //create car Name
        const {name} = req.body                                  //extract name of Name from json post request
        const carActive = await CarActive.create({name})                       //async create manufacturer with {name} in db
        return res.json(carActive)                                       //return Name in json
    }
    async getAll(req,res){                         //get Name
        const carActives = await CarActive.findAll()          //find all names
        return res.json(carActives)                              //return all Names in json
    }

    async delete(req,res){
        try{
            const {id} = req.params;
            await CarActive.findOne({where: {id}})
                .then( async data => {
                    if (data) {
                        await CarActive
                            .destroy({where: {id}})
                            .then(() => {
                                return res.json('CarActive deleted')
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

module.exports = new CarActiveController()