const ApiError = require('../error/ApiError')                      //import API errors
const bcrypt = require('bcrypt')                                //import encrypting module for hashing passwords
const {User, Order} = require('../models/models')            //import User and Order db models by destructuring
const jwt = require('jsonwebtoken')                        //import jsonwebtoken for sessions, reg, and auth

const generateJWT = (id, number, role) => {           //create generating Json Web Token with id, user-number and his role
    return jwt.sign(
        {id, number, role},                     //create PAYLOAD(id,number,role)
        process.env.SECRET_KEY,                          //secret key from .env
        {expiresIn: '24h'}                         //JWT lives 24h (need to re-authorize after 24h)
    )
}

class UserController {
    async registration(req, res, next) {                                //USER REGISTRATION
        const {number, password, role} = req.body                         //get number, password, role from request
        if (!number || !password) {                                         //if empty number and empty password - throw error
            return next(ApiError.badRequest('Некорректные данные! :( '))
        }

        const candidate = await User.findOne({where: {number}})                 //create candidate to authorization by finding his number in db

        if (candidate) {                                                        // if number of candidate already exist - > throw error
            return next(ApiError.badRequest('Этот номер телефона уже зарегестрирован! :( '))
        }

        const hashPassword = await bcrypt.hash(password, 5)                             //hashing password 5 times
        const user = await User.create({number, role: 'User', password: hashPassword})       //CREATE USER in db with number,role & hashed Password
        const order = await Order.create({userId: user.id})                         //CREATE ORDER FROM REGISTERED USER with user id
        const token = generateJWT(user.id, user.number, user.role)                       //generate token with user id, number & role
        return res.json({token})                                                        //return JWT to client
    }

    async login(req, res, next) {
        const {number, password} = req.body                                                 //get number and password from request
        const user = await User.findOne({where: {number}})                                 //create this user

        if (!user) {                                                                      //check user in database by number
            return next(ApiError.internal('Пользователь не найден! :( '))                 //doesn't exist ? -> throw internal error
        }

        let comparePassword = bcrypt.compareSync(password, user.password)               //user exist? -> compare entered password with (decrypted) password in database

        if (!comparePassword){                                                         //passwords different ? -> throw internal error
            return next(ApiError.internal('Указан неверный пароль! :( '))
        }
        const token = generateJWT(user.id, user.number, user.role)                   //generate JWT with users id,number,role
        return res.json({token})                                                    //return JWT to client
    }

    async check(req, res, next) {                                                     //check authorization
        const token = generateJWT(req.user.id, req.user.number, req.user.role)      //generate JWT with users id,number,role
        return res.json({token})                                                  //return JWT to client
    }
}

module.exports = new UserController()