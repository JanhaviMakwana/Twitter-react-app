import React from 'react';
import Login from '../Login/Login';
import { CardActionArea, CardMedia, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles'
const useStyles = makeStyles({
    auth: {
        maxWidth: '50vw',
        maxHeight: '48vw'
    },
    media: {
        height: '48vw',
        width: '50vw'
    },
    login: {
        width: '50vw'
    }
});

const Auth = (props) => {

    const classes = useStyles();
    const src = require('../../assets/twitter2.jpg').default;
    return (
        <Box className={classes.auth} display="flex" flexDirection="row">
            <CardActionArea>
                <CardMedia
                    image={src}
                    className={classes.media}
                    title="Twitter Image"
                />
            </CardActionArea>
            <Box className={classes.login}>
                <Login />
            </Box>
        </Box>
    );
};

export default Auth;