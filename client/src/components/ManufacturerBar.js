import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import classes from "../scss/ManufacturerBar.module.scss";
import Layout from '../utils/Layout'
const ManufacturerBar = observer (() => {
    const {car} = useContext(Context)

    // useEffect(() => {
    //     car.setSelectedManufacturer("all");
    // },[car])

    const getAllCars= () => {
        car.setSelectedManufacturer("all");
    }

    return (
        <Layout>
            <div className={classes['ManufacturerBar']}>
                <div className={classes['Sort__container-title']}>
                    <p>Производитель:</p>
                </div>

                <div className={classes['Sort__container-options']}>
                    <div
                        className={classes['Sort__container-element']}
                        style={'all'=== car.selectedManufacturer ? {borderBottom:"2px solid #CD3319"} : {borderBottom:"none"}}
                        onClick={getAllCars}
                    >
                        Все
                    </div>

                    {car.manufacturers.map((manufacturer,index) =>
                        <div className={classes['Sort__container-element']}
                             style={manufacturer.id === car.selectedManufacturer.id ? {borderBottom:"2px solid #CD3319"} : {borderBottom:"none"}}  //make selected option visible
                             key={index}
                             onClick={() => car.setSelectedManufacturer(manufacturer)}
                        >
                            {manufacturer.name}
                        </div>
                    )}
                </div>
            </div>
        </Layout>

    );
})
export default ManufacturerBar;