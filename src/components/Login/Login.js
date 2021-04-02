import React, { useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';
import { handleGoogleSignIn, handleFacebookSignIn, handleSignOut, initializeLoginFramework } from './loginManager';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
    
document.title = 'Sign In';

const btnStyle = { 
    marginBottom: '15px', 
    borderRadius: '30px', 
    cursor: 'pointer', 
    backgroundColor: 'white', 
    boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .2)'
}

const Login = () => {
    document.title = 'Login';
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        photo: '',
        message: '',
        success: false,
        signOut: false
    });
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: '/' } };

    initializeLoginFramework();

    const googleLogin = () => {
        handleGoogleSignIn()
        .then(modifiedUser => {
            setUserAndRedirect(modifiedUser, true);
        })
    }

    const facebookLogin = () => {
        handleFacebookSignIn()
        .then(modifiedUser => {
            setUserAndRedirect(modifiedUser, true);
        })
    }

    const signOut = () => {
        handleSignOut()
            .then(modifiedUser => {
                setUserAndRedirect(modifiedUser, false);
            })
    }

    
    if(loggedInUser.signOut){
        // console.log('sign out')
        signOut();
    }


    const setUserAndRedirect = (modifiedUser, redirect) => {
        setUser(modifiedUser);
        setLoggedInUser(modifiedUser);
        redirect && history.replace(from);
    }

    return (
        <Container maxWidth="xs" style={{marginTop: '5%'}}>
            <Grid container >
                <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center'}}> 
                    <h3>Sign In</h3>
                </Grid>
            </Grid>
            <Grid container alignItems='center' onClick={googleLogin} style={btnStyle}>
                <Grid item xs={4} justify="flex-start">
                    <img alt="Google Logo" style={{height: '30px'}} src='https://www.svgrepo.com/show/223041/google.svg' />
                </Grid>
                <Grid item xs={8} style={{ display: 'flex', justifyContent: 'start'}}> 
                    <p>Sign in with Google</p>
                </Grid>
            </Grid>
            <Grid container alignItems='center' onClick={facebookLogin} style={btnStyle}>
                <Grid item xs={4} ml={0}>
                    <img alt="Facebook Logo" style={{height: '30px'}} src='https://www.svgrepo.com/show/111202/facebook.svg' />
                </Grid>
                <Grid item xs={8} style={{ display: 'flex', justifyContent: 'start'}}> 
                    <p>Sign in with Facebook</p>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Login;