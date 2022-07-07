//FACE BANNER COMPONENT
import React, {useState,useEffect} from 'react';
import classes from '../scss/FrontPage.module.scss'
import Layout from '../utils/Layout'
import pic from '../assets/60828600-1.webp'

const FrontPage = () => {

    const [toggle, setToggle] = useState(false)

    useEffect(() => {
        const intervalID = setTimeout(() =>  {
            setToggle((toggle) => !toggle)
        }, 5000);

        return () => clearInterval(intervalID);
    }, [toggle]);

    return (
        <Layout>
            {/* Image */}
            <div className={classes.FrontPage}  style={{backgroundImage: "url(" + pic + ")"}} >
                { /* Text */}
                <div className={classes['FrontPage__text']}>
                    <p className={classes['FrontPage__text-header']}>АВТО С ЯПОНИИ В КАЗАХСТАН</p>
                    <p className={classes['FrontPage__text-subheader']}>

                        { toggle ?
                            `Подбор и доставка \n автомобилей \n с аукционов Японии`
                            : `Доставка автомобилей \n через ЖД \n из Владивостока в Алматы`

                        }
                    </p>                    {/* Red square on banner */}
                    <div className={classes['FrontPage__square']}/>
                </div>
            </div>
        </Layout>
    )
}

export default FrontPage;
