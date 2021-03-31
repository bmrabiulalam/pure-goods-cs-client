import React, { useContext } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import { Link, useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import CustomLinkTag from '../CustomLinkTag/CustomLinkTag';
import { UserContext } from '../../App';
import AccountCircle from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
        backgroundColor: 'transparent',
    },
    title: {
        color: '#444',
        fontWeight: 600,
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
}));

const StyledButton = withStyles({
    root: {
        background: 'linear-gradient(45deg, tomato 10%, orange 90%)',
        borderRadius: 8,
        border: 0,
        color: 'white',
        height: 40,
        padding: '0 20px',
        marginLeft: '10px',
    },
    label: {
        textTransform: 'capitalize',
    },
})(Button);

export default function Header() {
    const classes = useStyles();
    const history = useHistory();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleClick = route => {
        history.push(route);
    }

    const handleLogout = () => {
        handleMenuClose();
        setLoggedInUser({});
    }

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose} style={{backgroundColor: 'lightgray'}}>
                <p>{loggedInUser.name}</p>
            </MenuItem>
            <MenuItem onClick={handleLogout}>
                <p>Logout</p>
            </MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem onClick={() => handleClick('/home')}>
                <p>Home</p>
            </MenuItem>
            <MenuItem onClick={() => handleClick('/orders')}>
                <p>Orders</p>
            </MenuItem>
            <MenuItem onClick={() => handleClick('/admin')}>
                <p>Admin</p>
            </MenuItem>
            <MenuItem onClick={() => handleClick('/deals')}>
                <p>Deals</p>
            </MenuItem>
            {
                loggedInUser.isSignedIn 
                ? 
                <MenuItem onClick={handleProfileMenuOpen}>
                    <IconButton
                        aria-label="account of current user"
                        aria-controls="primary-search-account-menu"
                        aria-haspopup="true"
                        color="inherit"
                    >
                        {
                            loggedInUser?.photo 
                            ? <img alt={loggedInUser.name} style={{height: '40px', borderRadius: '50%'}} src={loggedInUser.photo} />
                            : <AccountCircle />
                        }
                    </IconButton>
                    <p>{loggedInUser.name}</p>
                </MenuItem>
                : 
                <MenuItem onClick={() => handleClick('/login')}>
                    <p>Login</p>
                </MenuItem>
            }
        </Menu>
    );

    return (
        <div className={classes.grow}>
            <AppBar position="static" style={{ background: 'transparent'}}>
                <Toolbar>
                    <Typography className={classes.title} variant="h4" noWrap>
                        Pure Goods
                    </Typography>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop} style={{alignItems: 'center'}}>
                        <CustomLinkTag linkName='Home' route='/home' />
                        <CustomLinkTag linkName='Orders' route='/orders' />
                        <CustomLinkTag linkName='Admin' route='/admin' />
                        <CustomLinkTag linkName='Deals' route='/deals' />

                        {
                            loggedInUser.isSignedIn 
                            ? 
                            <IconButton
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="darkgray"
                            >
                                {
                                    loggedInUser?.photo 
                                    ? <img alt={loggedInUser.name} style={{height: '40px', borderRadius: '50%'}} src={loggedInUser.photo} />
                                    : <AccountCircle />
                                }
                            </IconButton>
                            
                            : 
                            <Link to='/login' style={{ textDecoration: 'none' }}>
                                <StyledButton>Login</StyledButton>
                            </Link>
                        }
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="#333"
                        >
                            <MoreIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </div>
    );
}
