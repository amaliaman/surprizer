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
            <div>
                {event && `Current event: ${event.title}`} |
                 {user && `Current user: ${user.name || user.email || user.phone}`} |
                 {role && `Current role: ${role.title}`}
            </div>
        );
    }
}

export default Header;