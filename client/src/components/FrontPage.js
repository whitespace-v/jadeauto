//FACE BANNER COMPONENT
import React from 'react';
import classes from '../scss/FrontPage.module.scss'
import Layout from '../utils/Layout'
import pic from '../assets/60828600-1.webp'

const FrontPage = () => {
    return (
        <Layout>
            {/* Image */}
            <div className={classes.FrontPage}  style={{backgroundImage: "url(" + pic + ")"}} >
                { /* Text */}
                <div className={classes['FrontPage__text']}>
                    <p className={classes['FrontPage__text-header']}>АВТО С ЯПОНИИ В КАЗАХСТАН</p>
                    <p className={classes['FrontPage__text-subheader']}>Подбор и доставка <br/>автомобилей <br/> с аукционов Японии</p>
                    {/* Red square on banner */}
                    <div className={classes['FrontPage__square']}/>
                </div>
            </div>
        </Layout>
    )
}

export default FrontPage;