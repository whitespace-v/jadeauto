//Data Models
const sequelize  = require('../db')  //data base
const {DataTypes} = require('sequelize')  // for data types by destructuring

//create entities
const User = sequelize.define('user', {
    id:                  {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    number:              {type: DataTypes.STRING, allowNull: false },  //need to set , unique: true
    password:            {type: DataTypes.STRING, allowNull: false},
    role:                {type: DataTypes.STRING, defaultValue: 'USER'}  //need to set , unique: true defaultValue: 'USER'
})

const Order = sequelize.define('order', {
    id:                  {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}               //in future make from it to show car delivery info
})

const CarsInOrder = sequelize.define('cars_in_order', {
    id:                  {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const Car = sequelize.define('car', {
    id:                  {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    nameName:            {type: DataTypes.STRING,    allowNull: false },          //название
    manufacturerName:    {type: DataTypes.STRING,    allowNull: false },          //производитель
    price:               {type: DataTypes.STRING,    allowNull: false },          // Цена
    manufacturerId:      {type: DataTypes.INTEGER,   allowNull: false },          // ID Производителя  - сортировка
    carNameId:           {type: DataTypes.INTEGER,   allowNull: false },          // ID Названия       - сортировка
    year:                {type: DataTypes.STRING,    allowNull: false },          // Год
    motor:               {type: DataTypes.STRING,    allowNull: false },          // Двигатель
    drive:               {type: DataTypes.STRING,    allowNull: false },          // Привод
    mileage:             {type: DataTypes.STRING,    allowNull: false },          // Пробег
    bodyNumber:          {type: DataTypes.STRING,    allowNull: false },          // Номер кузова
    city:                {type: DataTypes.STRING,    allowNull: false },          // Город
    date:                {type: DataTypes.STRING,    allowNull: false },          // Дата
    description:         {type: DataTypes.STRING,    allowNull: false },          // Описание
    video:               {type: DataTypes.STRING,    allowNull: false },          // Видео
    image:               {type: DataTypes.STRING,    allowNull: false },          // Главное фото
    status:              {type: DataTypes.STRING,    allowNull: false }           //Статус (Sold / Active)
})

const CarName = sequelize.define('car_name', {
    id:                  {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name:                {type: DataTypes.STRING,    allowNull: false }
})

const Manufacturer = sequelize.define('manufacturer', {
    id:                  {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name:                {type: DataTypes.STRING,    allowNull: false}
})

const CarActive = sequelize.define('car_active', {
    id:                  {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name:                {type: DataTypes.STRING,    allowNull: false}
})

const CarStatus = sequelize.define('car_status', {
    id:                  {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name:                {type: DataTypes.STRING,    allowNull: false}
})

const CarImages = sequelize.define('car_images', {
    id:                  {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    img:                 {type: DataTypes.STRING,    allowNull: false}
})
//for belongsToMany
const CarNameManufacturer = sequelize.define('car_name_manufacturer', {
    id:                   {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})
const CarNameCarStatus = sequelize.define('car_name_car_status', {
    id:                   {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})
const ManufacturerCarStatus = sequelize.define('manufacturer_car_status', {
    id:                   {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const CarActiveManufacturer = sequelize.define('car_active_manufacturer', {
    id:                   {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})
const CarActiveCarName = sequelize.define('car_active_car_name', {
    id:                   {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})
const CarActiveCarStatus = sequelize.define('car_active_car_status', {
    id:                   {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})



User.hasOne(Order)
Order.belongsTo(User)

Order.hasMany(CarsInOrder)
CarsInOrder.belongsTo(Order)

Car.hasMany(CarsInOrder)
CarsInOrder.belongsTo(Car)

Car.hasMany(CarImages, {as: 'images'})
CarImages.belongsTo(Car)

// 5.MANUFACTURER-CAR hasMany
Manufacturer.hasMany(Car)
Car.belongsTo(Manufacturer)

CarName.hasMany(Car)
Car.belongsTo(CarName)

CarStatus.hasMany(Car)
Car.belongsTo(CarStatus)

CarActive.hasMany(Car)
Car.belongsTo(CarActive)

// 6.Name-MANUFACTURER belongsToMany
CarName.belongsToMany(Manufacturer,{through: CarNameManufacturer})
CarName.belongsToMany(CarStatus,{through: CarNameCarStatus})
CarName.belongsToMany(CarActive,{through: CarActiveCarName})

Manufacturer.belongsToMany(CarName,{through: CarNameManufacturer})
Manufacturer.belongsToMany(CarStatus,{through: ManufacturerCarStatus})
Manufacturer.belongsToMany(CarActive,{through: CarActiveManufacturer})

CarStatus.belongsToMany(Manufacturer,{through: ManufacturerCarStatus})
CarStatus.belongsToMany(CarName,{through: CarNameCarStatus})
CarStatus.belongsToMany(CarActive,{through: CarActiveCarStatus})

CarActive.belongsToMany(CarName,{through: CarActiveCarName})
CarActive.belongsToMany(Manufacturer,{through: CarActiveManufacturer})
CarActive.belongsToMany(CarStatus,{through: CarActiveCarStatus})
//export
module.exports = {
    User, Order, Manufacturer, CarsInOrder, Car, CarImages, CarName,
    CarNameManufacturer, CarStatus, CarNameCarStatus, ManufacturerCarStatus,
    CarActiveCarStatus, CarActive,CarActiveManufacturer,CarActiveCarName
}