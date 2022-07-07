//mobx and data storage
import {makeAutoObservable} from "mobx";

export default class CarStore {
    constructor() {                     //calls with creating CarStore object
        this._carNames = []
        this._manufacturers = []
        this._cars = []
        this._statuses = []
        this._actives = []
        this._selectedActive = {}
        this._selectedManufacturer = {}
        this._selectedCarName = {}
        this._selectedCarStatus = {}
        this._page = 1
        this._totalCount = 0
        this._limit = 10
        makeAutoObservable(this)        //with changing _isAuth & _user components will rerender
    }

    //ACTIONS - functions that change state
    //SETTERS

    /**all variants**/
    setCarNames(carNames){
        this._carNames = carNames
    }
    setManufacturers(manufacturers){
        this._manufacturers = manufacturers
    }
    setCarStatuses(statuses){
        this._statuses = statuses
    }
    setCarActives(actives){
        this._actives = actives
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
    setSelectedCarStatus(status){
        this.setPage(1)
        this._selectedCarStatus = status
    }
    setSelectedActive(active){
        this.setPage(1)
        this._selectedActive = active
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
    get statuses(){
        return this._statuses
    }
    get actives(){
        return this._actives
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
    get selectedCarStatus(){
        return this._selectedCarStatus
    }
    get selectedActive(){
        return this._selectedActive
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