import React from 'react';
import HomePage from 'components/home/HomePage';
import EventsPage from 'components/events/EventsPage';
import DevicesPage from 'components/device/DevicesPage';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

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
