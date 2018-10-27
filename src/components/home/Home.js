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
      <div className='outer-wrapper'>
        <div className='container'>
          <div className='hero'>Surprize!</div>
          <div className='description'><b>Surprizer</b> lets you organize virtual surprise parties.</div>

          {this.props.isSignedIn && <button class='new-event-btn' type='button' onClick={this.props.toggleModal}>New Event</button>}
          <NewEventModal />

          <CustomLoader isLoading={this.props.isLoading}>
            <UserEvents title='Upcoming Events' />
          </CustomLoader>
        </div>
      </div>
    );
  }
}

export default Home;