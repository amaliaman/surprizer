import React, { Component } from 'react';
import LoginModal from './LoginModal';
import { inject, observer } from 'mobx-react';

@inject(stores => ({
  toggleModal: stores.store.toggleLoginModal,
}))
@observer
class LoginButton extends Component {
    render() {
        return (
            <div>
                <span onClick={this.props.toggleModal}>Login</span>
                <LoginModal />
            </div>
        );
    }
}

export default LoginButton;