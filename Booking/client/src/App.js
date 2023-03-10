import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Auth from './components/Auth/Auth';
import CustomerDetails from './components/CustomerDetails/CustomerDetails';

const App = () => {
    const user = JSON.parse(localStorage.getItem('profile'));
    return (
        <BrowserRouter>
            <Container maxWidth="xl">
                <Navbar />
                <Switch>
                    <Route path="/" exact component={() => <Redirect to="/customers" />} />
                    <Route path="/customers" exact component={Home} />
                    <Route path="/customers/search" exact component={Home} />
                    <Route path="/customers/:id" component={CustomerDetails} />
                    <Route path="/auth" exact component={() => (!user ? <Auth /> : <Redirect to="/customers" />)} />
                </Switch>
            </Container>
        </BrowserRouter>
    );
}

export default App;