import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import moment from 'moment';

@inject(stores => ({
    userEvents: stores.store.userEvents,
    user: stores.store.currentUser
}))
@observer
class UserEvents extends Component {
    render() {
        return (
            <div>
                <h3>My Events</h3>
                {this.props.user && this.props.userEvents.map(e => <p key={e.id}>
                    {e.title}, {moment(e.date).format('L HH:mm')}
                    <Link to={`/events/${e.id}/${this.props.user.id}`}>Go</Link>
                </p>)}
            </div>
        );
    }
}

export default UserEvents;