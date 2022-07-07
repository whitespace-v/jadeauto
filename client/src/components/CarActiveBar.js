import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import classes from "../scss/ManufacturerBar.module.scss";
import Layout from '../utils/Layout'

const CarActiveBar = observer (() => {
    const {car} = useContext(Context)

    const getAllCars = () => {
        car.setSelectedActive("all");
    }
    return (
        <Layout>
            <div className={classes['ManufacturerBar']}>
                <div className={classes['Sort__container-title']}>
                    <p>Наличие:</p>
                </div>

                <div className={classes['Sort__container-options']}>
                    <div
                        className={classes['Sort__container-element']}
                        style={'all' === car.selectedActive ? {borderBottom:"2px solid #CD3319"} : {borderBottom:"none"}}
                        onClick={getAllCars}
                    >
                        Все
                    </div>
                    {car.actives.map((selectedActive, index) =>
                        <div className={classes['Sort__container-element']}
                             style={selectedActive.name === car.selectedActive.name ?
                                 {borderBottom:"2px solid #CD3319"} : {borderBottom:"none"}}
                             key={index}
                             onClick={() => car.setSelectedActive(selectedActive)}
                        >
                            {selectedActive.name}
                        </div>
                    )}
                </div>
            </div>
        </Layout>

    );
})
export default CarActiveBar;