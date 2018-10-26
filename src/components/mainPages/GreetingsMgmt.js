import React, { Component } from 'react';
import { action } from 'mobx';
import { observer, inject } from 'mobx-react';

import GuestName from '../guestName/GuestName';

@inject(stores => ({
    parseQueryParams: stores.store.parseQueryParams,
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
                <GuestName />
                and role
                Here are your greetings for event:

                -- event

      </div>
        );
    }
}

export default GreetingsMgmt;