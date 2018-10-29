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
    currentGreetings: stores.store.currentGreetings,
    setGreetingView: stores.store.setGreetingView,
}))
@observer
class EventParty extends Component {

    @action componentDidMount = () => {
        const { userId, eventId, parseQueryParams, setGreetingView } = this.props;
        parseQueryParams({ eventId, userId });
        setGreetingView('all');

        if (this.props.event && !this.props.event.chatRoomId) {
            this.props.createChatRoom();
        }
    };

    render() {
        const { event } = this.props;
        return (
            <div className='outer-wrapper party banner'>
                <div className='container'>
                    <div className='hero'>
                        <div>
                            <div className='title'>Party on!</div>
                            <div className='description'>This is the real party! Chat with people and mingle.</div>
                        </div></div>
                    <div className='main-body'>
                        <CustomLoader isLoading={this.props.isLoading}>
                            {event && <h3>Welcome to {event.title}</h3>}
                            {event && event.chatRoomId && <ChatContainer />}
                            {this.props.user && <h2>{this.props.user.name}</h2>}
                            <GreetingsBox greetings={this.props.currentGreetings} />
                        </CustomLoader>
                    </div>
                </div>
            </div>
        );
    }
}

export default EventParty;