import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import classes from "../scss/ManufacturerBar.module.scss";
import Layout from '../utils/Layout'

const CarStatusBar = observer (() => {
    const {car} = useContext(Context)

    const getAllCars = () => {
        car.setSelectedCarStatus("all");
    }
    return (
        <Layout>
            <div className={classes['ManufacturerBar']}>
                <div className={classes['Sort__container-title']}>
                    <p>Город:</p>
                </div>

                <div className={classes['Sort__container-options']}>
                    <div
                        className={classes['Sort__container-element']}
                        style={'all' === car.selectedCarStatus ? {borderBottom:"2px solid #CD3319"} : {borderBottom:"none"}}
                        onClick={getAllCars}
                    >
                        Все
                    </div>
                    {car.statuses.map((selectedCarStatus, index) =>
                        <div className={classes['Sort__container-element']}
                             style={selectedCarStatus.name === car.selectedCarStatus.name ? {borderBottom:"2px solid #CD3319"} : {borderBottom:"none"}}  //make selected option visible
                             key={index}
                             onClick={() => car.setSelectedCarStatus(selectedCarStatus)}
                        >
                            {selectedCarStatus.name}
                        </div>
                    )}
                </div>
            </div>
        </Layout>

    );
})
export default CarStatusBar;