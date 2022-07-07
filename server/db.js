//connection to database (using PostgreSQL)
const {Sequelize} = require('sequelize') //import only Sequelize by destructuring

module.exports = new Sequelize( //export new object from Sequelize
    process.env.DB_NAME,    //get database Name from .env
    process.env.DB_USER,    //get database User from .env
    process.env.DB_password, //get database Password from .env
    {
        dialect: 'postgres',        //select DBMS dialect
        host: process.env.DB_HOST,  //get database HOST from .env
        port: process.env.DB_PORT   //get database PORT from .env
    }

)
