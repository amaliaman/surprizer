import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

@inject(stores => ({
    event: stores.store.currentEvent,
    user: stores.store.currentUser,
    role: stores.store.currentRole,
}))
@observer
class Header extends Component {
    render() {
        const { event, user, role } = this.props;
        return (
            <small><i>
                {event && `Current event: ${event.title}`} |
                &nbsp;{user && `Current user: ${user.name || user.email || user.phone}`} |
                &nbsp;{role && `Current role: ${role.title}`}
            </i></small>
        );
    }
}

export default Header;