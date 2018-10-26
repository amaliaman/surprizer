import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { observable, action } from 'mobx';

@inject(stores => ({
    updateUser: stores.store.updateUser
}))
@observer
class GuestNameForm extends Component {
    @observable userName = '';

    @action handleChange = e => {
        this[e.target.name] = e.target.value;
    };

    @action handleSubmit = e => {
        e.preventDefault();
        this.props.updateUser({ name: this.userName });
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>Please enter your name as you would like it to appear in the greeting:</label>
                <input type='text' name='userName' value={this.userName} placeholder='Name' onChange={this.handleChange} required />
                <button type='submit'>Save</button>
            </form>
        );
    }
}

export default GuestNameForm;