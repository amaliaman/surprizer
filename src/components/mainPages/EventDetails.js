import React, { Component } from 'react';
import { action } from 'mobx';
import { observer, inject } from 'mobx-react';

import CustomLoader from '../general/CustomLoader';
import GreetingsBox from '../greetings/GreetingsBox';

@inject(stores => ({
    event: stores.store.currentEvent,
    getEventFull: stores.store.getEventFull,
    isLoading: stores.store.isLoading,
    parseQueryParams: stores.store.parseQueryParams,
}))
@observer
class EventDetails extends Component {
    @action componentDidMount = () => {
        const { userId, eventId, parseQueryParams } = this.props;
        parseQueryParams({ eventId, userId });
    };

    render() {
        return (
            <CustomLoader isLoading={this.props.isLoading}>
                {this.props.event && this.props.event.title}
                <GreetingsBox />
            </CustomLoader>
        );
    }
}

export default EventDetails;