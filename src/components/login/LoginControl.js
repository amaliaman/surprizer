import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import LoginButton from './LoginButton';

@inject(stores => ({
    currentUserExists: stores.store.currentUserExists,
    username: stores.store.currentUser ? (stores.store.currentUser.name || stores.store.currentUser.email || stores.store.currentUser.phone) : '',
    logout: stores.store.logout
}))
@observer
class LoginControl extends Component {
    render() {
        const { currentUserExists, logout, username } = this.props;

        return (
            <div className='login-btn'>
                {currentUserExists ?
                    <span onClick={logout}>{`Hi ${username}, Logout`}</span>
                    :
                    <LoginButton />
                }
            </div>
        );
    }
}

export default LoginControl;