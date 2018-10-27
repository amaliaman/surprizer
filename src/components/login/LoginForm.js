import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

@inject(stores => ({
    dummyLogin: stores.store.dummyLogin
}))
@observer
class LoginForm extends Component {
    render() {
        return (
            <div>
                <input type='text' placeholder='Username' />
                <br />
                <button className='btn' type='button' onClick={this.props.dummyLogin}>Login</button>
                <br />
                <small><i>hard-coded login user 'Ami' for now</i></small>
            </div>
        );
    }
}

export default LoginForm;