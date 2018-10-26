import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { observable, action } from 'mobx';
// import { Redirect } from 'react-router';

import GuestPicker from '../forms/guestPicker/GuestPicker';
import CustomLoader from '../general/CustomLoader';

@inject(stores => ({
    addEvent: stores.store.addEvent,
    // redirectTo: stores.store.redirectTo,
    isLoading: stores.store.isLoading
}))
@observer
class NewEventForm extends Component {
    @observable title = '';
    @observable date = '';
    @observable users = {};

    @action handleChange = e => {
        this[e.target.name] = e.target.value;
    };

    @action setUsersFromPicker = (guests, roleId) => {
        this.users[roleId] = guests;
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.addEvent(this.title, this.date, this.users, true);
    };

    render() {
        // if (this.props.redirectTo) {
        //     return <Redirect to={this.props.redirectTo} />
        // }
        return (
            <div>
                <h2>New Event</h2>
                <form className='form new-event-form' onSubmit={this.handleSubmit}>
                    <label>Title:</label>
                    <input
                        name='title'
                        type='text'
                        placeholder='Title'
                        onChange={this.handleChange}
                        value={this.title}
                        required
                    />

                    <label>Date:</label>
                    <input
                        name='date'
                        type='datetime-local'
                        placeholder='date'
                        onChange={this.handleChange}
                        value={this.date}
                        required
                    />

                    <label>Guests:</label>
                    <GuestPicker roleId={2} setUsersFromPicker={this.setUsersFromPicker} />

                    <label>Surprisees:</label>
                    <GuestPicker roleId={3} setUsersFromPicker={this.setUsersFromPicker} />

                    <CustomLoader isLoading={this.props.isLoading} height={40}>
                        <button type='submit'>Save</button>
                    </CustomLoader>
                </form>
            </div>
        );
    }
}

export default NewEventForm;