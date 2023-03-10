import React, { useState } from 'react';
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from "@material-ui/core";
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

import { getCustomersBySearch } from '../../actions/customers';
import Pagination from '../Pagination';
import Customers from '../Customers/Customers';
import Form from '../Form/Form';
import useStyles from './styles';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const [currentId, setCurrentId] = useState(0);
    const dispatch = useDispatch();
    const query = useQuery();
    const history = useHistory();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const classes = useStyles();
    const [searchTerms, setSearchTerms] = useState('');
    const [searchTags, setSearchTags] = useState([]);

    const searchCustomer = () => {
        if (searchTerms.trim() || searchTags) {
            dispatch(getCustomersBySearch({ searchTerms, searchTags: searchTags.join(',') }));
            history.push(`/customers/search?searchQuery=${searchTerms || 'none'}&tags=${searchTags.join(',')}`);
        } else {
            history.push('/');
        }

    }

    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            searchCustomer();
        }
    };

    const handleAdd = (tag) => setSearchTags([...searchTags, tag]);
    const handleDelete = (tagToDelete) => setSearchTags(searchTags.filter((tag) => tag !== tagToDelete));

    return (
        <Grow in>
            <Container maxWidth="xl">
                <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
                    <Grid item xs={12} sm={6} md={9}>
                        <Customers setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar className={classes.appBarSearch} position="static" color="inherit">
                            <TextField name="search" variant="outlined" label="Search Customers" fullWidth
                                value={searchTerms}
                                onKeyPress={handleKeyPress}
                                onChange={(e) => setSearchTerms(e.target.value)} />
                            <ChipInput style={{ margin: '10px 0' }} value={searchTags} onAdd={handleAdd} onDelete={handleDelete} label="Search Tags" variant="outlined" />
                            <Button onClick={searchCustomer} className={classes.searchButton} variant="contained" color="primary">Search</Button>
                        </AppBar>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                        {(!searchQuery && !searchTags.length) && (
                            <Paper elevation={6} className={classes.pagination}>
                                <Pagination page={page} />
                            </Paper>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    );
}

export default Home;