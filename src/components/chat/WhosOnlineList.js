import React, { Component } from 'react';

class WhosOnlineList extends Component {
    renderUsers() {
        return (
            <ul className='whos-online-list'>
                {this.props.users.map((user, index) => {
                    if (user.id === this.props.currentUser.id) {
                        return (
                            <WhosOnlineListItem key={index} presenceState="online">
                                {user.name} (You)
                      </WhosOnlineListItem>
                        )
                    }
                    return (
                        <WhosOnlineListItem key={index} presenceState={user.presence.state}>
                            {user.name}
                        </WhosOnlineListItem>
                    )
                })}
            </ul>
        )
    }

    render() {
        if (this.props.users) {
            return this.renderUsers()
        } else {
            return <p>Loading...</p>
        }
    }
}

class WhosOnlineListItem extends Component {
    render() {
        return (
            <li>
                <div>
                    <div className='whos-online-pill' style={{
                        backgroundColor: this.props.presenceState === 'online' ? '#539eff' : '#414756',
                    }} /></div>
                <div>{this.props.children}</div>
            </li>
        )
    }
}

export default WhosOnlineList;