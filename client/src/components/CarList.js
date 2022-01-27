import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import CarItem from "./CarItem";
import classes from '../scss/CarList.module.scss'
import Layout from '../utils/Layout'

const CarList = observer(() => {
    const {car} = useContext(Context)


    return (
        <Layout>
            <div className={classes.CarList}>
                {car.cars.map((car,index) =>
                    <CarItem
                        key={index}                //check for problems
                        car={car}
                        index={index}
                    />
                )}
            </div>
        </Layout>

    );
})

export default CarList;