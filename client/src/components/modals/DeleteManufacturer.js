import React, {useContext, useState} from 'react';
import classes from "../../scss/Modal.module.scss";
import {deleteManufacturer} from "../../http/carAPI";
import {Context} from "../../index";

const CreateName = ({visible,setDeleteManufacturerVisible}) => {

    const {car} = useContext(Context)
    const [selectedManufacturer, setSelectedManufacturer] = useState(null)

    const Delete = async (event) => {

        event.preventDefault();
        await deleteManufacturer(selectedManufacturer.id)
            .then( () => {
                setDeleteManufacturerVisible(false)
                setSelectedManufacturer('all')
                window.location.reload();
            })
    }

    return (
        <div className={visible ? classes.Modal + ' '+ classes.visible : classes.Modal} onClick={() => setDeleteManufacturerVisible(false)}>
            <div className={visible ? classes.Modal__data + ' '+ classes.visible : classes.Modal__data} onClick={e => e.stopPropagation()}>
                <form action="">
                    <p>Производитель</p>
                    <small style={{color: '#fa0000cc'}}><span>Будьте внимательны! </span> <br/>не удаляйте задействованного производителя</small>
                    <div className={classes['select_container']}>
                        {
                            car.manufacturers.map(manufacturer =>
                                <div
                                    className={classes['select']}
                                    key={manufacturer.id}
                                    onClick={() => {
                                        car.setSelectedManufacturer(manufacturer)
                                        setSelectedManufacturer(manufacturer)
                                    }

                                    }
                                    style={manufacturer.id === car.selectedManufacturer.id ? {borderBottom:"2px solid #CD3319"}: {borderBottom:"none"}}
                                >
                                    {manufacturer.name}
                                </div>)
                        }
                    </div>

                    <button
                        className={classes['Modal__data-button']}
                        onClick={Delete}>Удалить</button>
                </form>
            </div>
        </div>
    );
}

export default CreateName;