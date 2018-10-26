import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { observable, action } from 'mobx';

import CustomLoader from '../general/CustomLoader';

@inject(stores => ({
    createGreeting: stores.store.createGreeting,
    isLoading: stores.store.isLoading
}))
@observer
class AddGreetingForm extends Component {
    @observable text = '';
    @observable isPrivate = false;
    @observable typeId = 1;

    @action handleChange = e => {
        this[e.target.name] = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    };

    @action handleSubmit = e => {
        e.preventDefault();
        this.props.createGreeting(this.text, this.isPrivate, this.typeId);
    };

    render() {
        return (
            <div>
                <h2>Add Greeting</h2>
                <form className='form new-greeting-form' onSubmit={this.handleSubmit}>
                    <label>Greeting:</label>
                    <textarea
                        name='text'
                        type='text'
                        placeholder='Greeting'
                        onChange={this.handleChange}
                        value={this.text}
                        rows={4}
                        required
                    />

                    <label>Private:</label>
                    <input
                        name='isPrivate'
                        type='checkbox'
                        checked={this.isPrivate}
                        onChange={this.handleChange}
                    />

                    <CustomLoader isLoading={this.props.isLoading} height={40}>
                        <button type='submit'>Save</button>
                    </CustomLoader>
                </form>
            </div>
        );
    }
}

export default AddGreetingForm;