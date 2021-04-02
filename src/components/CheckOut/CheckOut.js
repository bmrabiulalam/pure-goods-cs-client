import React, { useContext } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { CheckOutProductContext, UserContext } from '../../App';

const StyledButton = withStyles({
    root: {
        background: 'linear-gradient(45deg, #47e644 10%, #0bab84 90%)',
        borderRadius: 8,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
    label: {
        textTransform: 'capitalize',
    },
})(Button);

const useStyles = makeStyles({
    grid: {
        maxWidth: 1000,
    },
    table: {
      minWidth: 700,
    },
  });

const CheckOut = () => {
    document.title = 'Checkout';
    const classes = useStyles();
    const [checkOutProduct, ] = useContext(CheckOutProductContext);
    const [loggedInUser, ] = useContext(UserContext);
    const {name, weight, price} = checkOutProduct;

    const checkout = () => {
        const orderDetails = {...loggedInUser, products: checkOutProduct, orderTime: new Date()};

        fetch('https://pure-goods.herokuapp.com/checkout', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(orderDetails)
        })
        .then(res => res.json())
        .then(data => {
            alert(data ? "Order Placed Successfully!" : "Failed to Place Order!");
        })
    }
  
    return (
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '3%'}}>
            <Grid container spacing={1} className={classes.grid}>
                <Grid item xs={12} align="left">
                    <h2>CheckOut</h2>
                </Grid>
                <Grid item xs={12}>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="spanning table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Desc</TableCell>
                                <TableCell align="center">Qty.</TableCell>
                                <TableCell align="right">Price</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow key={name}>
                                <TableCell>{name} - {weight}</TableCell>
                                <TableCell align="center">{1}</TableCell>
                                <TableCell align="right">${price}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                </Grid>
                <Grid item xs={12} align='right'>
                    <StyledButton onClick={checkout}>Checkout</StyledButton>
                </Grid>
            </Grid>
        </div>
    );
};

export default CheckOut;

