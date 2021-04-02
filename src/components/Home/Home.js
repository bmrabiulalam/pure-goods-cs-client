import React, { useEffect, useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Product from '../Product/Product';

const Home = () => {
    document.title = 'Home';
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch('https://pure-goods.herokuapp.com/products')
        .then(res => res.json())
        .then(data => setProducts(data));
    }, [])

    return (
        products.length > 0 ?
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '30px', paddingInline: '2%'}}>
            {
                products.map(product => <Product key={product._id} product={product}></Product>)
            }
        </div> 
        : 
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20%' }}>
            <CircularProgress />
        </div> 
    );
};

export default Home;