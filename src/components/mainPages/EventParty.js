import React, { Component } from 'react';
import { action } from 'mobx';
import { observer, inject } from 'mobx-react';

import GreetingsBox from '../greetings/GreetingsBox';
import CustomLoader from '../general/CustomLoader';
import ChatContainer from '../chat/ChatContainer';

@inject(stores => ({
    event: stores.store.currentEvent,
    user: stores.store.currentUser,
    getEventFull: stores.store.getEventFull,
    isLoading: stores.store.isLoading,
    createChatRoom: stores.store.createChatRoom,
    parseQueryParams: stores.store.parseQueryParams,
}))
@observer
class EventParty extends Component {

    @action componentDidMount = () => {
        const { /* getEventFull, */ userId, eventId, parseQueryParams } = this.props;
        // getUser(userId);
        parseQueryParams({eventId, userId});
        // getEventFull(eventId, userId);
    };

    render() {
        const { event } = this.props;
        return (
            <CustomLoader isLoading={this.props.isLoading}>
                {/* replace with automatic creation of room */}
                {event && !event.chatRoomId && <div>
                    <button type='button' onClick={this.props.createChatRoom}>Create chat</button>
                    <small>will be auto created</small></div>}

                {event && event.chatRoomId && < ChatContainer />}

                {event && <h1>Welcome to {event.title}</h1>}
                {this.props.user && <h2>{this.props.user.name}</h2>}

                <GreetingsBox />
            </CustomLoader>
        );
    }
}

export default EventParty;