import React,{useContext} from 'react';
import {Context} from '../index'
import classes from '../scss/Pages.module.scss'
import {observer} from 'mobx-react-lite'
import {Pagination} from 'react-bootstrap'
import Layout from '../utils/Layout'
const Pages = observer(() => {
    const {car} = useContext(Context)
    const pageCount = Math.ceil(car.totalCount / car.limit)
    const pages = []

    for (let i = 0; i < pageCount; i++){
        pages.push(i + 1)
    }

    const switchPage = (page) => {
        car.setPage(page)
        window.scrollTo(0, 0);
    }

    return (
        <Layout>
            <div className={classes['pagination']}>
                <Pagination className={classes['pagination__element']}>
                    {pages.map(page =>
                        <Pagination.Item
                            className={classes['pagination__element-item']}
                            key={page}
                            style={car.page === page ? {borderBottom:"2px solid #CD3319"} : {borderBottom:"none"}}
                            onClick={() => switchPage(page)}
                        >
                            {page}
                        </Pagination.Item>
                    )}
                </Pagination>
            </div>
        </Layout>

    );
});

export default Pages;