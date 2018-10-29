import React, { Component } from 'react';
import CustomLoader from '../general/CustomLoader';
import UserEvents from '../home/UserEvents';
import { inject, observer } from 'mobx-react';

@inject(stores => ({
    isLoading: stores.store.isLoading,
    userEvents: stores.store.userEvents,
}))
@observer
class MyEvents extends Component {
    render() {
        return (
            <div className='outer-wrapper events banner'>
                <div className='container'>
                    <div className='hero'>
                        <div>
                            <div className='title'>Events</div>
                            <div className='description'>Here you can view all your events, past present & future.</div>
                        </div>
                    </div>
                    <CustomLoader isLoading={this.props.isLoading}>
                        <UserEvents title='My Events' events={this.props.userEvents} type='all' />
                    </CustomLoader>
                </div></div>
        );
    }
}

export default MyEvents;