//main page
import React from 'react';
import classes from '../scss/Jade.module.scss'
import ManufacturerBar from '../components/ManufacturerBar'
import CarNameBar from "../components/CarNameBar";
import CarList from '../components/CarList'
import {observer} from 'mobx-react-lite'
import {Context} from '../index'
import {useContext, useEffect} from 'react'
import {fetchManufacturers,fetchCarNames, fetchCars} from '../http/carAPI'
import FrontPage from '../components/FrontPage'
import Pages from '../components/Pages'
import Footer from '../components/Footer'

const Jade = observer(() => {
    const {car} = useContext(Context)

    useEffect(() => {
        fetchManufacturers().then(data => car.setManufacturers(data))
        fetchCarNames().then(data => car.setCarNames(data))
        fetchCars(null, null, 1, car.limit).then(data => {
            car.setCars(data.rows)
            car.setTotalCount(data.count)
        })
    },[car])

    useEffect(() => {
        fetchCars(car.selectedManufacturer.id, car.selectedCarName.id, car.page, car.limit).then(data => {
            car.setCars(data.rows)
            car.setTotalCount(data.count)
        })
    }, [car, car.page, car.selectedManufacturer, car.selectedCarName])

    return (
        <div className={classes.Jade}>
            <FrontPage/>
            <ManufacturerBar/>
            <CarNameBar/>
            <CarList/>
            <Pages/>
            <Footer/>
        </div>

    );
})

export default Jade;