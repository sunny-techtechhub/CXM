import React, { useEffect } from 'react';
import { Paper, Typography, CircularProgress, Divider } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useHistory } from 'react-router-dom';
import CommentSection from './CommentSection';
import { getCustomer, getCustomersBySearch } from '../../actions/customers';
import useStyles from './styles';

const Customer = () => {
    const { customer, customers, isLoading } = useSelector((state) => state.customers);
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
    const { id } = useParams();

    useEffect(() => {
        dispatch(getCustomer(id));
    }, [id]);

    useEffect(() => {
        if (customer) {
            dispatch(getCustomersBySearch({ searchTerms: 'none', searchTags: customer?.tags.join(',') }));
        }
    }, [customer]);

    if (!customer) return null;

    if (isLoading) {
        return (
            <Paper elevation={6} className={classes.loadingPaper} >
                <CircularProgress size="7em" />
            </Paper>
        );
    }

    const recommendedCustomers = customers.filter(({ _id }) => _id !== customer._id);

    const openCustomer = (_id) => history.push(`/customers/${_id}`);

    return (
        <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
            <div className={classes.card}>
                <div className={classes.section}>
                    <Typography variant="h3" component="h2">{customer.lastName}<br/>{customer.firstName}</Typography>
                    <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{customer.tags.map((tag) => `#${tag} `)}</Typography>
                    <Typography gutterBottom variant="body1" component="p">{customer.mobile}</Typography>
                    <Typography variant="h6">Email: {customer.email}</Typography>
                    <Typography variant="h6">Created by: {customer.name}</Typography>
                    <Typography variant="body1">{moment(customer.createdAt).fromNow()}</Typography>
                    <Divider style={{ margin: '20px 0' }} />
                    <CommentSection customer={customer} />
                    <Divider style={{ margin: '20px 0' }} />
                </div>
                <div className={classes.imageSection}>
                    <img className={classes.media} src={customer.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={customer.mobile} />
                </div>
            </div>
            {!!recommendedCustomers.length && (
                <div className={classes.section}>
                    <Typography gutterBottom variant="h5">You might also like:</Typography>
                    <Divider />
                    <div className={classes.recommendedCustomers}>
                        {recommendedCustomers.map(({ firstName, lastName, mobile, email, likes, selectedFile, _id }) => (
                            <div style={{ margin: '20px', cursor: 'pointer' }} onClick={() => openCustomer(_id)} key={_id}>
                                <Typography gutterBottom variant="h6">{firstName}&nbsp;{lastName}</Typography>
                                <Typography gutterBottom variant="subtitle2">{mobile}</Typography>
                                <Typography gutterBottom variant="subtitle2">{email}</Typography>
                                <Typography gutterBottom variant="subtitle1">Likes: {likes.length}</Typography>
                                <img src={selectedFile} width="200px" />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </Paper>
    );
};

export default Customer