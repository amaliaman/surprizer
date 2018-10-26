import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import LoginButton from './LoginButton';

@inject(stores => ({
    currentUserExists: stores.store.currentUserExists,
    logout: stores.store.logout
}))
@observer
class LoginControl extends Component {
    render() {
        const { currentUserExists, logout } = this.props;

        return (
            <div className='login-btn'>
                {currentUserExists ?
                    <span onClick={logout}>Logout</span>
                    :
                    <LoginButton />
                }
            </div>
        );
    }
}

export default LoginControl;
