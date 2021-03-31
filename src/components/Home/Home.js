import React, { useEffect, useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Product from '../Product/Product';

const Home = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/events')
        .then(res => res.json())
        .then(data => setProducts(data));
    }, [])

    return (
        products.length > 0 ?
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '30px' }}>
            {
                products.map(product => <Product product={product}></Product>)
            }
        </div> 
        : 
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20%' }}>
            <CircularProgress />
        </div> 
    );
};

export default Home;