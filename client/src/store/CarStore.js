//mobx and data storage
import {makeAutoObservable} from "mobx";

export default class CarStore {
    constructor() {                     //calls with creating CarStore object
        this._carNames = []
        this._manufacturers = []
        this._cars = []
        this._selectedManufacturer = {}
        this._selectedCarName = {}
        this._page = 1
        this._totalCount = 0
        this._limit = 10
        makeAutoObservable(this)        //with changing _isAuth & _user components will rerender
    }

    //ACTIONS - functions that change state                                 //SETTERS
    setCarNames(carNames){
        this._carNames = carNames
    }
    setManufacturers(manufacturers){
        this._manufacturers = manufacturers
    }
    setCars(cars){
        this._cars = cars
    }

    setSelectedManufacturer(manufacturer){
        this.setPage(1)
        this._selectedManufacturer = manufacturer
    }
    setSelectedCarName(carName){
        this.setPage(1)
        this._selectedCarName = carName
    }

    setPage(page){
        this._page = page
    }
    setTotalCount(count){
        this._totalCount = count
    }
    setLimit(count){
        this._limit = count
    }


    //COMPUTED FUNCTIONS - only called if internal variables have changed   //GETTERS
    get carNames (){               //get variables from state
        return this._carNames
    }
    get manufacturers(){
        return this._manufacturers
    }
    get cars(){
        return this._cars
    }
    get selectedManufacturer(){
        return this._selectedManufacturer
    }
    get selectedCarName(){
        return this._selectedCarName
    }
    get totalCount(){
        return this._totalCount
    }
    get page(){
        return this._page
    }
    get limit(){
        return this._limit
    }

}