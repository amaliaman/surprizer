import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import CustomLoader from '../general/CustomLoader';
import NewEventModal from './NewEventModal';
import UserEvents from './UserEvents';

@inject(stores => ({
  toggleModal: stores.store.toggleNewEventModal,
  isLoading: stores.store.isLoading,
  isSignedIn: stores.store.isSignedIn,
  futureUserEvents: stores.store.futureUserEvents,
  currentParties: stores.store.currentParties,
}))
@observer
class Home extends Component {
  render() {
    return (
      <div className='outer-wrapper home banner'>
        <div className='container'>
          <div className='hero'>
            <div>
              <div className='title'>Surprize!</div>
              <div className='description'><b>Surprizer</b> lets you organize virtual surprise parties.</div>
            </div>
          </div>

          <div className='main-body'>
            {this.props.isSignedIn && <button className='btn' type='button' onClick={this.props.toggleModal}>New Event</button>}
            <NewEventModal />
            {this.props.isSignedIn ? (
              <CustomLoader isLoading={this.props.isLoading}>
                <UserEvents title='Current Parties' events={this.props.currentParties} type='current' />
                <UserEvents title='Upcoming Events' events={this.props.futureUserEvents} type='future' />
              </CustomLoader>
            ) : (
                <div>Please sign in.
                  <br />
                  <br />
                  Don't have an account?<br />
                  <button className='btn' onClick={() => alert('soon')}>Sign Up</button>
                </div>
              )}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;