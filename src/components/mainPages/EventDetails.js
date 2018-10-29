import React, { Component } from 'react';
import { action } from 'mobx';
import { observer, inject } from 'mobx-react';
import moment from 'moment';

import CustomLoader from '../general/CustomLoader';

@inject(stores => ({
    event: stores.store.currentEvent,
    users: stores.store.currentUsers,
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

    getUsersByRole = roleId => {
        const userItems = this.props.users
            .filter(u => u.eventsUsers.roleId === roleId)
            .map(u => <li key={u.id}>{u.name || u.email || u.phone}</li>);
        const list = <ul>{userItems}</ul>;
        return list;
    };

    render() {
        const { event } = this.props;
        return (
            <div className='outer-wrapper banner details'>
                <div className='container'>

                    <div className='hero'>
                        <div>
                            <div className='title'>The Event</div>
                            <div className='description'>Some details about the event you're organizing.</div>
                        </div>
                    </div>

                    <CustomLoader isLoading={this.props.isLoading}>
                        {event && (
                            <div>
                                <h3>{event.title}</h3>
                                <div className='event-datails'>
                                    <span>Date:</span>
                                    <span>{moment(event.date).format('L HH:mm')}</span>
                                    <span>Organizers:</span>
                                    <div>{this.getUsersByRole(1)}</div>
                                    <span>Surprizees:</span>
                                    <div>{this.getUsersByRole(3)}</div>
                                    <span>Guests:</span>
                                    <div>{this.getUsersByRole(2)}</div>
                                </div>
                                <button type='button' className='btn' onClick={() => alert('soon')}>Edit</button>
                            </div>
                        )}
                    </CustomLoader>
                </div></div>
        );
    }
}

export default EventDetails;