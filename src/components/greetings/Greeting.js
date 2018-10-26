import React, { Component } from 'react';

class Greeting extends Component {
    render() {
        return (
            <div>
                <h4>{this.props.greeting.text}</h4>
                <small>{this.props.greeting.user.name}</small>
            </div>
        );
    }
}

export default Greeting;