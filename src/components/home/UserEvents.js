import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import moment from 'moment';

@inject(stores => ({
    userId: stores.store.currentUser ? stores.store.currentUser.id : null,
}))
@observer
class UserEvents extends Component {
    getEvents = () => {
        const { events, userId, type } = this.props;
        return events.map(e => {
            return (<div key={e.id}>
                <span>{e.title}</span>
                <span className='date'>{moment(e.date).format('L HH:mm')}</span>
                <span><Link to={`/events/${e.id}/${userId}`}>details</Link></span>
                <span><Link to={`/events/${e.id}/${userId}/greetings`}>greetings</Link></span>
                {type === 'current' && <span><Link to={`/events/${e.id}/${userId}/party`}>party!</Link></span>}
            </div>)
        })
    };

    render() {
        return (
            <div>
                <h3>{this.props.title}</h3>
                <div className='user-events'>{this.props.events.length ? this.getEvents() : 'Nothing at the moment...'}</div>
            </div>
        );
    }
}

export default UserEvents;