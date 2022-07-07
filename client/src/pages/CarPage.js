//CAR PAGE COMPONENT
import React, { useEffect, useState} from 'react';
import Layout from "../utils/Layout";
import classes from "../scss/CarPage.module.scss";
import {useParams} from 'react-router-dom'
import {observer} from "mobx-react-lite";
import {fetchOneCar} from "../http/carAPI";
import ReactPlayer from 'react-player'
import SendMessage from '../components/modals/SendMessage'
import Footer from "../components/Footer";
import FullSize from '../components/modals/FullSize'
import disableScroll from 'disable-scroll';
import gif from '../assets/loader.gif'

const CarPage = observer(({userRole}) => {
    const {id} = useParams();
    const [SendMessageVisible, setSendMessageVisible] = useState(false)
    const [car, setCar] = useState({images: []});
    const [selectedImg,setSelectedImg] = useState(null)
    const [fullSizeVisible, setFullSizeVisible] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect( () => {
        window.scrollTo(0, 0);
        setSelectedImg(0);
        setFullSizeVisible(false)

        fetchOneCar(id)
            .then(data => setCar(data))
            .finally(() => setLoading(false))
    },[id]);

    fullSizeVisible ? disableScroll.on() : disableScroll.off()
    if (loading) {
        return <div className={classes.loader}> <img src={gif} alt='loading'/> </div>
    }
    function sortByKey(array, key) {
        return array.sort(function(a, b) {
            let x = a[key]; let y = b[key];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    }
    sortByKey(car.images, 'id')
    return (
        <Layout>
            <div className={classes['CarPage']}>
                <div className={classes['CarPage__visual']}>
                    {/** Sold-alert **/}
                    {
                        car.status === 'Sold' ? <span
                            className={classes['CarPage__visual-alert']}
                        > Автомобиль продан ! </span> : null
                    }
                    {/** Car title **/}
                    <p
                        className={classes['CarPage__title']}
                        style={car.status === 'Sold' ? {textDecoration: 'line-through'} : null}
                    >
                        {car.manufacturerName} {car.nameName}, {car.year} год
                    </p>

                    <div className={classes['CarPage__visual-images']}>


                        {/** Car Big Image or Video**/}
                        {car.images.length && selectedImg !== 'video' ?
                            <div
                                className={classes['CarPage__visual-images-main']}
                                style={{backgroundImage: `url("${process.env.REACT_APP_API_URL}${car.images[selectedImg].img}")`}}
                                onClick={() => setFullSizeVisible(true)}
                            />
                            :
                            <div
                                className={classes['CarPage__visual-images-main']}
                            >
                                <ReactPlayer
                                    className={classes['CarPage__visual-images-main-video']}
                                    controls
                                    url = {process.env.REACT_APP_API_URL + car.video}
                                />
                            </div>
                        }



                        {/** Additional images **/}

                        <div className={classes['CarPage__visual-images-extends']}>
                            {car.images.length ? car.images.map((image,index) =>
                                <div
                                    className={classes['CarPage__visual-images-extends-item']}
                                    style={selectedImg === index ? {border:"3px solid white", backgroundImage: `url("${process.env.REACT_APP_API_URL}${image.img}")`}
                                        : {border:"1px solid grey", backgroundImage: `url("${process.env.REACT_APP_API_URL}${image.img}")`}}
                                    key={index}
                                    onClick={() => setSelectedImg(index)}
                                />
                            ) : null

                            }
                            {/** Last additional visual item -> video **/}
                            {car.video !== 'empty'?
                                <div className={classes['CarPage__visual-images-extends-item']}>
                                    <ReactPlayer
                                        className={classes['video']}
                                        url = {process.env.REACT_APP_API_URL + car.video}
                                        onClick={() => setSelectedImg('video')}
                                        light = {true}
                                        style={selectedImg === 'video' ? {border:"3px solid white"} : {border:"1px solid grey"}}
                                    />
                                </div> : <span/>
                            }

                        </div>
                    </div>
                </div>
                <div className={classes['CarPage__info']}>
                    <p className={classes['CarPage__info-price']}><b>{car.price}</b> ₽</p>
                    {/** Car description **/}
                    <div className={classes['CarPage__info-details']}>
                        <div className={classes['CarPage__info-details-item']}>
                            <p className={classes['CarItem__params-details-item-def']}>Двигатель:</p>
                            <p className={classes['CarItem__params-motor']}>{car.motor}</p>
                        </div>

                        <div className={classes['CarPage__info-details-item']}>
                            <p className={classes['CarItem__params-details-item-def']}>Привод:</p>
                            <p className={classes['CarItem__params-drive']}>{car.drive}</p>
                        </div>

                        <div className={classes['CarPage__info-details-item']}>
                            <p className={classes['CarItem__params-details-item-def']}>Пробег:</p>
                            <p className={classes['CarItem__params-mileage']}>{car.mileage !== 0 ? car.mileage + ' км' : 'без пробега'}</p>
                        </div>

                        <div className={classes['CarPage__info-details-item']}>
                            <p className={classes['CarItem__params-details-item-def']}>Город:</p>
                            <p className={classes['CarItem__params-city']}>{car.status === 'Sold' ? 'Продано' : 'В наличии'}, {car.city}</p>
                        </div>

                        <div className={classes['CarPage__info-details-item']}>
                            <p className={classes['CarItem__params-details-item-def']}>Дата добавления:</p>
                            <p className={classes['CarItem__params-date']}>{car.date}</p>
                        </div>
                        <div className={classes['CarPage__info-details-item']}>
                            <p className={classes['CarItem__params-details-item-def']}>Описание:</p>
                        </div>
                        <p style={{whiteSpace: 'pre-line'}} className={classes['CarItem__params-description']}>{car.description}</p>
                        {/** To buy button **/}
                        <div
                            className={classes['CarPage__info-details-button']}
                            onClick={() => setSendMessageVisible(true)}
                        >
                            Купить
                        </div>
                        {/** Send message button **/}
                        <SendMessage
                            car={car}
                            visible={SendMessageVisible}
                            setSendMessageVisible={setSendMessageVisible}
                        />
                    </div>
                </div>
            </div>
            <Footer/>
            {/** Full size image **/}
            <FullSize
                visible={fullSizeVisible}
                setFullSizeVisible={setFullSizeVisible}
                images={car.images}
                selectedImg={selectedImg}
                setSelectedImg={setSelectedImg}
            />
        </Layout>
    );
})

export default CarPage;
