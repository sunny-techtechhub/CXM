import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';

import useStyles from './styles';
import { createCustomer, updateCustomer } from '../../actions/customers';

const Form = ({ currentId, setCurrentId }) => {
    const [customerData, setCustomerData] = useState({ firstName: '', lastName: '', mobile: '', email: '', tags: '', selectedFile: '' });
    const customer = useSelector((state) => currentId ? state.customers.customers.find((c) => c._id === currentId) : null);
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        if (!customer?.mobile) clear();
        if (customer) setCustomerData(customer);
    }, [customer]);

    const clear = () => {
        setCurrentId(0);
        setCustomerData({ firstName: '', lastName: '', mobile: '', email: '', tags: '', selectedFile: '' });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (currentId === 0 || !currentId) {
            dispatch(createCustomer({ ...customerData, name: user?.result?.name }));
        } else {
            dispatch(updateCustomer(currentId, { ...customerData, name: user?.result?.name }));
        }
        clear();
    }

    if (!user?.result?.name) {
        return (
            <Paper className={classes.paper}>
                <Typography variant='h6' align="center">
                    Please Sign In to create customers.
                </Typography>
            </Paper>
        );
    }

    return (
        <Paper className={classes.paper} elevation={6}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId ? `Editing "${customer?.mobile}"` : 'Creating a Customer'}</Typography>
                <TextField name="firstName" variant="outlined" label="First Name" fullWidth value={customerData.firstName} onChange={(e) => setCustomerData({ ...customerData, firstName: e.target.value })} />
                <TextField name="lastName" variant="outlined" label="Last Name" fullWidth value={customerData.lastName} onChange={(e) => setCustomerData({ ...customerData, lastName: e.target.value })} />
                <TextField name="mobile" variant="outlined" label="Mobile" fullWidth value={customerData.mobile} onChange={(e) => setCustomerData({ ...customerData, mobile: e.target.value })} />
                <TextField name="email" variant="outlined" label="Email" fullWidth value={customerData.email} onChange={(e) => setCustomerData({ ...customerData, email: e.target.value })} />
                <TextField name="tags" variant="outlined" label="Tags" fullWidth value={customerData.tags} onChange={(e) => setCustomerData({ ...customerData, tags: e.target.value.split(',') })} />
                <div className={classes.fileInput}> <FileBase type="file" multiple={false} onDone={({ base64 }) => setCustomerData({ ...customerData, selectedFile: base64 })} /> </div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    );
}

export default Form;