import React, { Component } from 'react';
import UsernameForm from './UsernameForm';
import ChatScreen from './ChatScreen';

class ChatContainer extends Component {
    constructor() {
        super()
        this.state = {
            currentUsername: '',
            currentScreen: 'WhatIsYourUsernameScreen',
        }
        this.onUsernameSubmitted = this.onUsernameSubmitted.bind(this)
    }

    onUsernameSubmitted(username) { // refactor to store//////////////////////////////////
        fetch('http://localhost:5000/chat/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username }),
        })
            .then(response => {
                this.setState({
                    currentUsername: username,
                    currentScreen: 'ChatScreen',
                })
            })
            .catch(error => console.error('error', error))
    }

    render() {  //refactor//////////////////////////////
        // if (this.state.currentScreen === 'WhatIsYourUsernameScreen') {
        //     return <UsernameForm onSubmit={this.onUsernameSubmitted} />
        // }
        // if (this.state.currentScreen === 'ChatScreen') {
            // return <ChatScreen currentUsername={this.state.currentUsername} />
            return <ChatScreen currentUsername='Ami' />
        // }
    }
}

export default ChatContainer;