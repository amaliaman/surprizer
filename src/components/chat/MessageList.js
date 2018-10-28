import React, { Component } from 'react';

class MessageList extends Component {
    render() {
        return (
            <div className='message-list-container'>
                <ul>
                    {this.props.messages.map((message, index) => (
                        <li key={index}>
                            <span className='sender-username'>{message.senderId}</span>{' '}
                            <div className='message'>{message.text}</div>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default MessageList;