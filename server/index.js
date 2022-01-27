require('dotenv').config()                              //import .env
const express = require('express')                      //import express
const models = require('./models/models')               //import database models
const sequelize = require('./db')                       //import DataBase config
const fileUpload = require('express-fileupload')        //import fileUpload
const cors = require('cors')                            //import for queries from browser
const router = require('./routes/index')                //import main router
const errorHandler = require('./middleware/ErrorHandlingMiddleware')    //import middleWare
const path = require('path')                            //import path for url
const PORT = process.env.PORT || 5000                   // port from .env and 5000 by default
const twilio = require('twilio');
const client = new twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);
const app = express()                                   //create object by call function express() (running our app)

app.use(cors())                                             //use  queries from browser
app.use(express.json())                                      //use parse json
app.use(express.static(path.resolve(__dirname,'static')))     //for usage files from static folder
app.use(fileUpload({}))                                //use file uploads with empty settings objet
app.use('/api', router)                                //use main router

app.get('/send-text', (req,res) => {
    //get variables
        const {buyer, textmessage, car} = req.query
        const formatted = '*ЗАЯВКА* \n' + textmessage + '\n' + car + '\n +' + buyer.trim()
        //send mes
        client.messages.create({
            body: formatted,
            from: 'whatsapp:+14155238886',
            to: 'whatsapp:+79532084008'
        }).then(message => console.log(formatted))
})

app.use(errorHandler)       //Strict usage in very end

const start = async () => {             //All queries to DataBase - async. Create DB query
    try {                                //try-catch for catching potential errors w/o app's crashing
        await sequelize.authenticate()    //DB connect
        await sequelize.sync()             //DB check Data schemes
        app.listen(PORT, () => console.log(`server started on port ${PORT}`) ) // start server and notification about
    } catch (e){                            // if error
        console.log(e)
    }
}


start()                 //run app
