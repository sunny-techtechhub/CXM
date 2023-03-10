import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Customer from './Customer/Customer'
import useStyles from './styles';

const Customers = ({ setCurrentId }) => {
    const { customers, isLoading } = useSelector((state) => state.customers);
    const classes = useStyles();

    if (!customers.length && !isLoading) return 'No customers';

    return (
        isLoading ? <CircularProgress /> : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {customers?.map((customer) => (
                    <Grid key={customer._id} item xs={12} sm={12} md={6} lg={3}>
                        <Customer customer={customer} setCurrentId={setCurrentId} />
                    </Grid>
                ))}
            </Grid>
        )
    );
}

export default Customers;