import React, { Component } from 'react';
import UsernameForm from './UsernameForm';
import ChatScreen from './ChatScreen';
import { inject, observer } from 'mobx-react';

@inject(stores => ({
    chatLogin: stores.store.chatLogin
}))
@observer
class ChatContainer extends Component {
    constructor() {
        super()
        this.state = {
            currentUsername: '',
            currentScreen: 'WhatIsYourUsernameScreen',
        }
    }

    onUsernameSubmitted = username => {
        this.props.chatLogin({ username })
            .then(response => {
                this.setState({
                    currentUsername: username,
                    currentScreen: 'ChatScreen',
                })
            })
            .catch(error => console.error('error', error))
    }

    render() {  //refactor//////////////////////////////
        if (this.state.currentScreen === 'WhatIsYourUsernameScreen') {
            return <UsernameForm onSubmit={this.onUsernameSubmitted} />
        }
        if (this.state.currentScreen === 'ChatScreen') {
            return <ChatScreen currentUsername={this.state.currentUsername} />
        }
    }
}

export default ChatContainer;