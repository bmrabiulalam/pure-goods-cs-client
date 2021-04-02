import React, { useEffect, useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles({
    grid: {
        maxWidth: 1000,
    },
    table: {
      minWidth: 550,
    },
  });

const EditProduct = () => {
    document.title = 'Manage Products';
    const classes = useStyles();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('https://pure-goods.herokuapp.com/products')
        .then(res => res.json())
        .then(data => setProducts(data));
    }, [])

    const handleDelete = id => {
        fetch('https://pure-goods.herokuapp.com/deleteProduct/'+id, {
            method: 'DELETE'
        })
        .then(res => {
            const productsAfterDeletion = products.filter(product => product._id !== id);
            setProducts(productsAfterDeletion)

            // res ? console.log('product deleted') : console.log('product delete failed')
        })
    }

    const handleEdit = id => console.log(id)
  
    return (
        products.length > 0 
        ?
        <div style={{display: 'flex', justifyContent: 'center', padding: '4%'}}>
            <Grid container spacing={1} className={classes.grid}>
                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="spanning table">
                            <TableHead>
                                <TableRow>
                                    <TableCell><strong>Product Name</strong></TableCell>
                                    <TableCell align="center"><strong>Weight</strong></TableCell>
                                    <TableCell align="center"><strong>Price</strong></TableCell>
                                    <TableCell align="center"><strong>Action</strong></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    products.map(product => {
                                        const { _id, name, weight, price } = product;

                                        return  <TableRow key={name}>
                                                    <TableCell>{name}</TableCell>
                                                    <TableCell align="center">{weight}</TableCell>
                                                    <TableCell align="center">${price}</TableCell>
                                                    <TableCell align="center">
                                                        <IconButton aria-label="edit" onClick={() => handleEdit(_id)}>
                                                            <EditIcon color="primary" />
                                                        </IconButton>
                                                        <IconButton aria-label="delete" onClick={() => handleDelete(_id)}>
                                                            <DeleteIcon style={{color: 'tomato'}} />
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </div>
        : 
        <div style={{ display: 'flex', justifyContent: 'center', paddingBlock: '10%' }}>
            <CircularProgress />
        </div> 
    );
};

export default EditProduct;