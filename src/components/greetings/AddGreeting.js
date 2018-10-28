import React, { Component } from 'react';
import AddGreetingModal from './AddGreetingModal';
import { inject } from 'mobx-react';

@inject(stores => ({
    toggleModal: stores.store.toggleAddGreetingModal
}))
class AddGreeting extends Component {
    render() {
        return (
            <div>
                <button type='button' className='btn' onClick={this.props.toggleModal}>Add Greeting</button>
                <AddGreetingModal />
            </div>
        );
    }
}

export default AddGreeting;