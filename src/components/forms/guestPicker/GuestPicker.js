import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { observable, action, reaction } from 'mobx';

import GuestInput from './GuestInput';

@observer
class GuestPicker extends Component {
    @observable guests = [{ type: '', email: '', phone: '' }];

    @action addInput = () => {
        this.guests.push({ type: '', email: '', phone: '' });
    };

    @action updateGuest = (index, type, value) => {
        this.guests[index][type] = value;
    };

    guestsChange = reaction(
        () => this.guests.map(g => { return { ...g } }),
        guests => this.props.setUsersFromPicker(guests, this.props.roleId)
    );

    render() {
        return (
            <div className='guest-picker'>
                {this.guests.map((g, i) =>
                    <GuestInput key={i} guest={g} index={i} updateGuest={this.updateGuest} />
                )}
                <button className='icon-button' type='button' onClick={this.addInput}>+</button>
            </div>
        );
    }
}

export default GuestPicker;