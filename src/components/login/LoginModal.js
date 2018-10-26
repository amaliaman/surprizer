import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Modal from 'react-responsive-modal';
import LoginForm from './LoginForm';


@inject(stores => ({
    isModal: stores.store.isLoginModal,
    toggleModal: stores.store.toggleLoginModal
}))
@observer
class LoginModal extends Component {
    render() {
        return (
            <Modal open={this.props.isModal} onClose={this.props.toggleModal} closeOnEsc={false} closeOnOverlayClick={false}>
                <LoginForm />
            </Modal >
        );
    }
}

export default LoginModal;