import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { action } from 'mobx';

@observer
class GuestInput extends Component {

    @action handleChange = e => {
        this.props.updateGuest(this.props.index, e.target.name, e.target.value);
    };

    render() {
        const { guest } = this.props;

        return (
            <div className='guest-input'>
                <select name='type' value={guest.type} onChange={this.handleChange} required>
                    <option value='' disabled>-</option>
                    <option value='email'>Email</option>
                    <option value='phone'>Phone</option>
                </select>

                {guest.type === 'email' &&
                    <input
                        name='email'
                        type='email'
                        placeholder='Email'
                        onChange={this.handleChange}
                        value={guest.email}
                        required
                    />
                }

                {guest.type === 'phone' &&
                    <input
                        name='phone'
                        type='tel'
                        placeholder='Phone'
                        onChange={this.handleChange}
                        value={guest.phone}
                        required
                    />
                }
            </div>
        );
    }
}

export default GuestInput;