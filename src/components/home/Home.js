import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import CustomLoader from '../general/CustomLoader';
import NewEventModal from './NewEventModal';
import UserEvents from './UserEvents';

@inject(stores => ({
  toggleModal: stores.store.toggleNewEventModal,
  isLoading: stores.store.isLoading,
  isSignedIn: stores.store.isSignedIn,
}))
@observer
class Home extends Component {
  render() {
    return (
      <div>
        {this.props.isSignedIn && <button type='button' onClick={this.props.toggleModal}>New Event</button>}
        <NewEventModal />
        <CustomLoader isLoading={this.props.isLoading}>
          <UserEvents />
        </CustomLoader>
      </div>
    );
  }
}

export default Home;