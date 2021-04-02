import React from 'react';
import { Link } from "react-router-dom";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ArrowBackwardIcon from '@material-ui/icons/ArrowBack';
import Box from '@material-ui/core/Box';
import NotFoundImg from '../../images/not-found.svg';

const useStyles = makeStyles({
    root: {
        maxWidth: 1000,
        backgroundColor: 'white',
        // borderRadius: 8,
        marginTop: '1%',
    },
});

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

const StyledCardMedia = withStyles({
    /* Styles applied to the root element. */
    root: {
        backgroundSize: 'contain',
        marginBlock: '30px',
    },
    /* Styles applied to the root element if `component="picture or img"`. */
    img: {
        // ⚠️ object-fit is not supported by IE 11.
        objectFit: 'contain',
    },
})(CardMedia);

const NotFound = (props) => {
    document.title = 'Error: 404! Page Not Found.';
    const classes = useStyles();

    return (
        <Box mx="auto" p={1} className={classes.root}>
            <CardActionArea>
                <StyledCardMedia
                    component="img"
                    alt='Page Not Found'
                    height="350"
                    image={NotFoundImg}
                    title='404! Page Not Found'
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                    Error: 404! Page Not Found
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                    You might not have permissions to see this page.
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions style={{display: 'flex', justifyContent: 'center'}}>
                <Link to='/' style={{textDecoration: 'none'}}>
                    <StyledButton><ArrowBackwardIcon />Back to home</StyledButton>
                </Link>
            </CardActions>
        </Box>
    );
};


export default NotFound;