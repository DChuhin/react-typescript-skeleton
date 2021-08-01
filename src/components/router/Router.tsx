import React from 'react';
import HomePage from 'components/home/HomePage';
import DevicesPage from 'components/device/DevicesPage';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import EventsPage from '../events/EventsPage';

const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/devices" exact component={DevicesPage} />
            <Route path="/events" exact component={EventsPage} />
        </Switch>
    </BrowserRouter>
);

export default Router;
