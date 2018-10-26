import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Modal from 'react-responsive-modal';

import AddGreetingForm from './AddGreetingForm';

@inject(stores => ({
    isModal: stores.store.isAddGreetingModal,
    toggleModal: stores.store.toggleAddGreetingModal
}))
@observer
class AddGreetingModal extends Component {
    render() {
        return (
            <Modal open={this.props.isModal} onClose={this.props.toggleModal} center styles={{ modal: { width: '100%' } }}>
                <AddGreetingForm />
            </Modal>
        );
    }
}

export default AddGreetingModal;