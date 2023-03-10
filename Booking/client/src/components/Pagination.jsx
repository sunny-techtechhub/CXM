import React, { useEffect } from 'react';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomers } from '../actions/customers';

import useStyles from './styles';

const Paginate = ({ page }) => {
    const { numberOfPages } = useSelector((state) => state.customers);
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        if (page) dispatch(getCustomers(page));
    }, [page]);

    return (
        <Pagination
            classes={{ ul: classes.ul }}
            count={numberOfPages}
            page={Number(page) || 1}
            variant="outlined"
            color="primary"
            renderItem={(item) => (
                <PaginationItem {...item} component={Link} to={`/customers?page=${item.page}`} />
            )}
        />
    );
};

export default Paginate;