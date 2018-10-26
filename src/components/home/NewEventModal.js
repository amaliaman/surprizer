import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Modal from 'react-responsive-modal';

import NewEventForm from './NewEventForm';

@inject(stores => ({
    isModal: stores.store.isNewEventModal,
    toggleModal: stores.store.toggleNewEventModal
}))
@observer
class NewEventModal extends Component {
    render() {
        return (
            <Modal open={this.props.isModal} onClose={this.props.toggleModal} center styles={{ modal: { width: '100%' } }}>
                <NewEventForm />
            </Modal>
        );
    }
}

export default NewEventModal;