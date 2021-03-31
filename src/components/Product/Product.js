import React, { useContext } from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { CheckOutContext } from '../../App';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles({
    root: {
        maxWidth: 280,
        backgroundColor: 'white',
        borderRadius: 8,
        marginBlock: '1%',
        boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .2)',
    },
});

const StyledButton = withStyles({
    root: {
        background: 'linear-gradient(45deg, #3bb739 10%, #0bab84 90%)',
        borderRadius: 8,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 15px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
    label: {
        textTransform: 'capitalize',
    },
})(Button);

const StyledCardMedia = withStyles({
    /* Styles applied to the root element. */
    root: {
        backgroundSize: 'contain',
        marginTop: '10px',
    },
    /* Styles applied to the root element if `component="picture or img"`. */
    img: {
        // ⚠️ object-fit is not supported by IE 11.
        objectFit: 'contain',
    },
})(CardMedia);

const Product = (props) => {
    const classes = useStyles();
    const [, setCheckOut] = useContext(CheckOutContext);
    const history = useHistory();
    const { name, image } = props.product;

    const handleBuy = () => {
        console.log(props.product)
        setCheckOut(props.product);
        history.push('/checkout');
    }
    
    return (
        <Box mx="auto" p={1} className={classes.root}>
            <CardActionArea>
                <StyledCardMedia
                    component="img"
                    alt={name}
                    height="300"
                    image={image}
                    title={name}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {name}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions style={{display: 'flex', justifyContent: 'between'}}>
                {/* <Typography gutterBottom variant="h5" component="h2">
                    ${price}
                </Typography> */}
                <StyledButton onClick={handleBuy}><ShoppingCartIcon /> Buy Now</StyledButton>
            </CardActions>
        </Box>
    );
};

export default Product;