import React, {useContext, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import classes from "../scss/CarNameBar.module.scss";
import Layout from '../utils/Layout'

const CarNameBar = observer(() => {
    const {car} = useContext(Context)

    useEffect(() => {
        car.setSelectedCarName("all");
    },[car])

    useEffect(() => {
        car.setSelectedCarName('all')
    }, [car, car.selectedManufacturer])

    const getAllCars= () => {
        car.setSelectedCarName("all");
    }

    return (
        <Layout>
            <div className={classes['CarNameBar']}>
                <div className={classes['Sort__container-title']}>
                    <p>Название:</p>
                </div>

                <div className={classes['Sort__container-options']}>
                    <div
                        className={classes['Sort__container-element']}
                        style={car.selectedCarName === 'all' ? {borderBottom:"2px solid #CD3319"} : {borderBottom:"none"}}
                        onClick={getAllCars}
                    >
                        Все
                    </div>
                    {car.carNames.map((carName,index) =>
                        <div className={classes['Sort__container-element']}
                             style={carName.id === car.selectedCarName.id ? {borderBottom:"2px solid #CD3319"}: {borderBottom:"none"}}
                             key={index}
                             onClick={()=> car.setSelectedCarName(carName)}
                        >
                            {carName.name}
                        </div>
                    )}
                </div>
            </div>
        </Layout>

    );
})
export default CarNameBar;