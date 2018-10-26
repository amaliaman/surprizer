import React, { Component } from 'react';
import { action } from 'mobx';
import { observer, inject } from 'mobx-react';

import GuestName from '../forms/guestName/GuestName';
import GreetingsBox from '../greetings/GreetingsBox';

@inject(stores => ({
    parseQueryParams: stores.store.parseQueryParams,
    eventTitle: stores.store.currentEvent ? stores.store.currentEvent.title : null,
    roleTItle: stores.store.currentRole ? stores.store.currentRole.title : null
}))
@observer
class GreetingsMgmt extends Component {
    @action componentDidMount = () => {
        const { userId, eventId, parseQueryParams } = this.props;
        parseQueryParams({ eventId, userId });
    };

    render() {
        return (
            <div>
                <h1>Greetings for {this.props.eventTitle}</h1>
                <GuestName />
                <div>Your are here as {this.props.roleTItle}. Here you can write greetings and upload files that will be seen on the surprize party.</div>
                <GreetingsBox />
            </div>
        );
    }
}

export default GreetingsMgmt;