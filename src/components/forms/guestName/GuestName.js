import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import GuestNameForm from './GuestNameForm';

@inject(stores => ({
    userName: stores.store.currentUser ? stores.store.currentUser.name : null
}))
@observer
class GuestName extends Component {
    render() {
        const { userName } = this.props;

        return (
            <div>
                {userName ?
                    <div>Hi {userName}</div>
                    :
                    <GuestNameForm />
                }
            </div>
        );
    }
}

export default GuestName;
