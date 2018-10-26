import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';

import NavBar from './components/general/NavBar';
import Home from './components/home/Home';
import EventParty from './components/mainPages/EventParty';
import EventDetails from './components/mainPages/EventDetails';
import GreetingsMgmt from './components/mainPages/GreetingsMgmt';
import Header from './components/general/Header';
import RedirectIntercept from './components/general/RedirectIntercept';

import { inject, observer } from 'mobx-react';

@inject(stores => ({
    redirectTo: stores.store.redirectTo
}))
@observer
class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    {this.props.redirectTo && <RedirectIntercept />}
                    <NavBar />
                    <Header />

                    {/* Home page */}
                    <Route path="/" exact render={() => <Home />} />

                    {/* TODO: ===================== if response with wrong params - redirect to 401 page */}
                    {/* Event details page, visible to organizer */}
                    <Route path="/events/:eventId/:userId" exact render={({ match }) => (
                        <EventDetails eventId={match.params.eventId} userId={match.params.userId} />
                    )} />

                    {/* Live party page, visible to everyone (content security trimmed) */}
                    <Route path="/events/:eventId/:userId/party" exact render={({ match }) => (
                        <EventParty eventId={match.params.eventId} userId={match.params.userId} />
                    )} />

                    {/* Upload greetins page, visible to guests */}
                    <Route path="/events/:eventId/:userId/greetings" exact render={({ match }) => (
                        <GreetingsMgmt eventId={match.params.eventId} userId={match.params.userId} />
                    )} />

                </div>
            </Router>
        );
    }
}

export default App;