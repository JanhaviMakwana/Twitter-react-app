import React, { useState } from 'react';
import { withRouter } from 'react-router';
import { Typography, Avatar, TextField, Button, Box } from '@material-ui/core';
import { withAuth } from '../../twitter-context';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/styles';
import AuthService from '../../Services/AuthService';
import { AUTH_SUCCESS, AUTH_FAIL } from '../../store/actionTypes';

const styles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'white',
        width: '50vw',
        paddingBottom: '250px',
        paddingTop: '100px'
    },
    avatar: {
        fontWeight: 'bold'
    },
    form: {
        width: '90%',
    }
}));


const Auth = (props) => {

    const classes = styles();

    const [email, setEmail] = useState('abc@123.com');
    const [password, setPassword] = useState('abc123');
    const [isSignup, setIsSignUp] = useState(false);

    const formSubmitHandler = (event) => {
        event.preventDefault();
        const data = {
            email: email,
            password: password
        }
        if (isSignup) {
            AuthService.signup(data)
                .then(res => {
                    props.dispatch({ type: AUTH_SUCCESS, user: res });
                    props.history.push('/home');
                })
                .catch(err => {
                    console.log(err);
                    props.dispatch({type: AUTH_FAIL, error: err.message});
                    alert('Access Denied !!!!');
                })
        } else {
            AuthService.login(data)
                .then(res => {
                    props.dispatch({ type: AUTH_SUCCESS, user: res });
                    props.history.push('/home');
                })
                .catch(err => {
                    console.log(err);
                    props.dispatch({type: AUTH_FAIL, error: err.message});
                    alert('Access Denied !!!!');
                })
        }
    };

    const emailChangeHandler = (event) => {
        setEmail(event.target.value);
    };

    const passwordChangeHandler = (event) => {
        setPassword(event.target.value);
    };

    const authChangeHandler = () => {
        setIsSignUp(!isSignup);
    };

    return (
        <Box className={classes.paper}>
            <Avatar>
                <LockOutlinedIcon />
            </Avatar>
            <Typography style={{ fontWeight: 'bold' }}>
                {isSignup ? "Sign Up" : "Sign In"}
            </Typography>
            <form className={classes.form}>
                <TextField
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    placeholder="Enter Email"
                    value={email}
                    onChange={emailChangeHandler}
                />
                <TextField
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    placeholder="Enter Password"
                    value={password}
                    onChange={passwordChangeHandler}
                />
                <Button
                    type="submit"
                    onClick={formSubmitHandler}
                    fullWidth
                    variant="contained"
                    color="primary"
                    style={{ fontWeight: 'bold', backgroundColor: '#0DD8F9' }}
                >
                    {isSignup ? "Sign Up" : "Sign In"}
                </Button>
                <Button
                    onClick={authChangeHandler}
                    fullWidth
                    variant="contained"
                    style={{ marginTop: '10px', fontWeight: 'bold' }}
                >
                    {isSignup ? "Already have an account ? Sign In" : "Don't have an account? Sign Up"}
                </Button>
            </form>

        </Box>
    );
};

export default withRouter(withAuth(Auth));