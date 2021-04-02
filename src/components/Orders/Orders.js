import React, { useContext, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Backdrop from '@material-ui/core/Backdrop';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { UserContext } from '../../App';

const useStyles = makeStyles((theme) => ({
    grid: {
        maxWidth: 1000,
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
    table: {
      minWidth: 700,
    },
  }));

const Orders = () => {
    document.title = 'Order Details';
    const classes = useStyles();
    const [orders, setOrders] = useState([]);
    const [singleOrder, setSingleOrder] = useState({});
    const [loggedInUser, ] = useContext(UserContext);
    const [open, setOpen] = useState(false);

    const handleClose = () => {
      setOpen(false);
    };

    const handleToggle = () => {
      setOpen(!open);
    };

    const handleClick = order => {
        handleToggle();
        setSingleOrder(order);
    }

    useEffect(() => {
        fetch('https://pure-goods.herokuapp.com/orders', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({email: loggedInUser.email})
        })
        .then(res => res.json())
        .then(data => setOrders(data))
    }, [loggedInUser.email])
  
    return (
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '3%'}}>
            <Grid container spacing={1} className={classes.grid}>
                <Grid item xs={12} align="left">
                    <h2>Purchase Order History</h2>
                </Grid>
                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="spanning table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center"><strong>Client</strong></TableCell>
                                    <TableCell align="center"><strong>Spending</strong></TableCell>
                                    <TableCell align="center"><strong>Date</strong></TableCell>
                                    <TableCell align="center"><strong>Action</strong></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                    {
                                        orders.map(order => {
                                            const { name, products, orderTime } = order;

                                            return  <TableRow key={name}>
                                                        <TableCell align="center">{name}</TableCell>
                                                        <TableCell align="center">${products?.price}</TableCell>
                                                        <TableCell align="center">{orderTime}</TableCell>
                                                        <TableCell align="center">
                                                            <IconButton aria-label="show-details" onClick={() => handleClick(order)}>
                                                                <VisibilityIcon color="primary" />
                                                            </IconButton>
                                                            Details
                                                        </TableCell>
                                                    </TableRow>
                                        })
                                    }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
            <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
                <p>{singleOrder?.orderTime}</p>
            </Backdrop>
        </div>
    );
};

export default Orders;

