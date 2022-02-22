//admin panel
import React, {useContext, useEffect, useState} from 'react';
import Layout from "../utils/Layout";
import CreateName from "../components/modals/CreateName";
import CreateManufacturer from "../components/modals/CreateManufacturer";
import DeleteCarName from "../components/modals/DeleteCarName";
import DeleteManufacturer from "../components/modals/DeleteManufacturer";
import DeleteCar from "../components/modals/DeleteCar";
import StatusCar from '../components/modals/StatusCar';
import CityCar from '../components/modals/CityCar';
import ActiveCar from '../components/modals/ActiveCar';
import CreateCityCar from '../components/modals/CreateCityCar'
import CreateCar from "../components/modals/CreateCar";
import {Context} from "../index";
import {fetchManufacturers, fetchCarNames, fetchCars, fetchCarStatuses, fetchCarActives} from '../http/carAPI'
import classes from '../scss/Admin.module.scss'
import {observer} from "mobx-react-lite";
import Footer from "../components/Footer";

const Admin = observer(() => {
    const [ManufacturerVisible, setManufacturerVisible] = useState(false)
    const [CarNameVisible, setCarNameVisible] = useState(false)
    const [CarVisible, setCarVisible] = useState(false)
    const [deleteManufacturerVisible, setDeleteManufacturerVisible] = useState(false)
    const [deleteCarNameVisible, setDeleteCarNameVisible] = useState(false)
    const [deleteCarVisible, setDeleteCarVisible] = useState(false)
    const [statusCarVisible, setStatusCarVisible] = useState(false)
    const [cityCarVisible, setCityCarVisible] = useState(false)
    const [createCityCarVisible, setCreateCityCarVisible] = useState(false)
    const [createActiveVisible, setCreateActiveVisible] = useState(false)
    const {car} = useContext(Context)

    useEffect(() => {
        fetchManufacturers().then(data => car.setManufacturers(data))
        fetchCarNames().then(data => car.setCarNames(data))
        fetchCarStatuses().then(data => car.setCarStatuses(data))
        fetchCarActives().then(data => car.setCarActives(data))
        fetchCars(null,null, null,null ,1, 1000000).then(data => {
            car.setCars(data.rows)
            car.setTotalCount(100000)
        })
    }, [car, car.page,car.selectedManufacturer, car.selectedCarName, car.selectedActive, car._limit])

    return (
        <Layout>
            <div className={classes['Admin']}>
                <div className={classes['Admin__panel']}>
                    <p>Панель администратора</p>
                    <div
                        className={classes['Admin__panel-button']}
                        onClick={()=> setManufacturerVisible(true)}>Добавить производителя</div>
                    <div
                        className={classes['Admin__panel-button']}
                        onClick={()=> setCarNameVisible(true)}>Добавить наименование</div>
                    <div
                        className={classes['Admin__panel-button']}
                        onClick={()=> setCreateCityCarVisible(true)}>Добавить местоположение</div>
                    <div
                        className={classes['Admin__panel-button']}
                        onClick={()=> setCreateActiveVisible(true)}>Добавить статус наличия</div>
                    <div
                        className={classes['Admin__panel-button']}
                        onClick={()=> setCarVisible(true)}>Добавить машину</div>
                    <div
                        className={classes['Admin__panel-button']}
                        onClick={()=> setDeleteManufacturerVisible(true)}>Удалить производителя</div>
                    <div
                        className={classes['Admin__panel-button']}
                        onClick={()=> setDeleteCarNameVisible(true)}>Удалить название</div>
                    <div
                        className={classes['Admin__panel-button']}
                        onClick={()=> setDeleteCarVisible(true)}>Удалить машину</div>
                    <div
                        className={classes['Admin__panel-button']}
                        onClick={()=> setStatusCarVisible(true)}>Смена наличия машины</div>
                    <div
                        className={classes['Admin__panel-button']}
                        onClick={()=> setCityCarVisible(true)}>Смена местоположения машины</div>
                </div>


                <CreateManufacturer
                    visible={ManufacturerVisible}
                    setManufacturerVisible={setManufacturerVisible}
                />
                <CreateName
                    visible={CarNameVisible}
                    setNameVisible={setCarNameVisible}
                />
                <CreateCityCar
                    visible={createCityCarVisible}
                    setCreateCityCarVisible={setCreateCityCarVisible}
                />
                <CreateCar
                    visible={CarVisible}
                    setCarVisible={setCarVisible}
                />
                <DeleteManufacturer
                    visible={deleteManufacturerVisible}
                    setDeleteManufacturerVisible={setDeleteManufacturerVisible}
                />
                <DeleteCarName
                    visible={deleteCarNameVisible}
                    setDeleteCarNameVisible={setDeleteCarNameVisible}
                />
                <DeleteCar
                    visible={deleteCarVisible}
                    setDeleteCarVisible={setDeleteCarVisible}
                />
                <StatusCar
                    visible={statusCarVisible}
                    setStatusCarVisible={setStatusCarVisible}
                />
                <ActiveCar
                    visible={createActiveVisible}
                    setCreateActiveVisible={setCreateActiveVisible}
                />
                <CityCar
                    visible={cityCarVisible}
                    setCityCarVisible={setCityCarVisible}
                />
            </div>
            <Footer/>
        </Layout>
    );
})

export default Admin;
