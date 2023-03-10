import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
//import { GoogleLogin } from 'react-google-login';
//import { useGoogleLogin } from '@react-oauth/google';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from "./styles";
import Input from './Input';
import { signIn, signUp } from '../../actions/auth';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState();

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isSignup) {
            dispatch(signUp(formData, history));
        } else {
            dispatch(signIn(formData, history));
        }
    }
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });

    }

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
    }

    //const login = useGoogleLogin({
    //onSuccess: (res) => googleSuccess(res),
    //onError: (err) => googleFailure(err)
    //});

    const googleSuccess = async (res) => {
        console.log('googleAuth res: ' + res);
        const userObject = jwt_decode(res?.credential);
        const token = userObject?.jti
        console.log('googleAuth sub: ' + userObject.sub + ' token: ' + token + ' jwt: ' + userObject);
        const user = {
            name: userObject.name,
            email: userObject.email,
            picture: userObject.picture,
            googleId: userObject.sub
        }
        console.log('google user name: ' + user.name);
        console.log('google user pic: ' + user.picture);
        console.log('google user: ' + user);

        try {
            dispatch({ type: 'AUTH', data: { result: user, token: res?.credential } });

            history.push('/');
        } catch (error) {
            console.log(error);
        }
    };

    const googleFailure = (error) => {
        console.log('Google Sign In was unsuccessful. Try Again Later');
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} autoFocus half />
                                </>
                            )
                        }
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                        {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {isSignup ? "Sign Up" : "Sign In"}
                    </Button>
                    {/*
                    <GoogleLogin
                        clientId="758262966658-dj202fsc8606e5kss7ukbctg9m6lvj2k.apps.googleusercontent.com"
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />
                    <Button className={classes.googleButton} color='primary' fullWidth onClick={() => useGoogleLogin({
                        onSuccess:{googleSuccess},
                        onFailure:{googleFailure}
                    })}  startIcon={<Icon />} variant="contained">
                        Google Sign In
                    </Button>
            */}

                    <GoogleOAuthProvider clientId="758262966658-dj202fsc8606e5kss7ukbctg9m6lvj2k.apps.googleusercontent.com">
                        <GoogleLogin
                            clientId="758262966658-dj202fsc8606e5kss7ukbctg9m6lvj2k.apps.googleusercontent.com"
                            onSuccess={googleSuccess}
                            onFailure={googleFailure}
                            theme="outline"
                            size="large"
                            text="Google Sign In"
                        />
                    </GoogleOAuthProvider>
                    <Grid container justifyContent='flex-end'>
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth;