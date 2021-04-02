import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import SaveIcon from '@material-ui/icons/Save';
const axios = require('axios');

const StyledButton = withStyles({
    root: {
        background: 'linear-gradient(45deg, #47e644 10%, #0bab84 90%)',
        borderRadius: 8,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 20px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
    label: {
        textTransform: 'capitalize',
    },
})(Button);

const AddProduct = () => {
    const [product, setProduct] = useState({
        name: '',
        price: 0,
        weight: '',
        image: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('product', product)

        const url = 'https://pure-goods.herokuapp.com/addProduct';
        fetch(url, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(product)
        })
        .then(res => {
            handleReset();
            console.log('product added');
        })
        // .then(data => console.log(data))
    }

    const handleImageUpload = e => {
        const imageData = new FormData();
        imageData.set('key', '396c9f1d9024868f3ecef6aaa44cbd7b');
        imageData.append('image', e.target.files[0]);
        console.log('image file ', e.target.files[0])

        axios.post('https://api.imgbb.com/1/upload', imageData)
            .then(function (response) {
                const newProduct = {...product};
                newProduct.image = response.data.data.display_url;
                setProduct(newProduct);
                console.log('image url ', response.data.data.display_url);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const handleBlur = (e) => {
        const newProduct = { ...product };
        newProduct[e.target.name] = e.target.value;
        setProduct(newProduct);
    }

    const handleReset = () => {
        // Select all the input elements on the page and reset
        Array.from(document.querySelectorAll("input")).forEach(
          input => (input.value = "")
        );
        
        setProduct({
            name: '',
            price: 0,
            weight: '',
            image: ''
        });
    };

    return (
        <div style={{padding: '4%'}}> 
            <form onSubmit={handleSubmit}>
                <Paper elevation={3} >
                    <Grid container spacing={3} justify='center' style={{paddingBlock: '40px'}}>
                        <Grid item xs={5} container justify='flex-end'>
                            <TextField onBlur={handleBlur} fullWidth name="name" id="outlined-basic-1" label="Product Name" variant="outlined" />
                        </Grid>
                        <Grid item xs={5} container justify='flex-start'>
                            <TextField onBlur={handleBlur} fullWidth name="weight" id="outlined-basic-2" label="Weight" variant="outlined" />
                        </Grid>
                        <Grid item xs={5} container justify='flex-end'>
                            <TextField onBlur={handleBlur} fullWidth name="price" id="outlined-basic-3" label="Price" variant="outlined" />
                        </Grid>
                        <Grid item xs={5} container justify='flex-start'>
                            <Button
                                fullWidth
                                component="label"
                                variant="outlined"
                                style={{ backgroundColor: 'lightgreen', color: 'green' }}
                                startIcon={<CloudUploadIcon />}
                            >
                                {product.image?.length > 0 ? 'Photo Added' : 'Add Photo'}
                            <input
                                    name="image"
                                    type="file"
                                    hidden
                                    onChange={handleImageUpload}
                                />
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
                <StyledButton style={{marginTop: '25px'}} type="submit" disabled={product.image?.length > 0 ? false : true}>
                    <SaveIcon />
                    <p>Save</p>
                </StyledButton>
            </form>
        </div>
    );
};

export default AddProduct;