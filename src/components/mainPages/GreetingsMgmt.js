import React, { Component } from 'react';
import { action } from 'mobx';
import { observer, inject } from 'mobx-react';

import GreetingsBox from '../greetings/GreetingsBox';

@inject(stores => ({
    parseQueryParams: stores.store.parseQueryParams,
    eventTitle: stores.store.currentEvent ? stores.store.currentEvent.title : null,
    roleTItle: stores.store.currentRole ? stores.store.currentRole.title : null,
    ownGreetings: stores.store.ownGreetings
}))
@observer
class GreetingsMgmt extends Component {
    @action componentDidMount = () => {
        const { userId, eventId, parseQueryParams } = this.props;
        parseQueryParams({ eventId, userId });
    };

    render() {
        return (
            <div className='outer-wrapper gr'>
                <div className='container'>
                    <div className='hero'>
                        <div>
                            <div className='title'>Greetings</div>
                            <div className='description'>Your are here as {this.props.roleTItle}. Here you can write greetings and upload files that will be seen on the surprize party.</div>

                        </div>
                    </div>
                    <h3>Greetings for {this.props.eventTitle}</h3>
                    <GreetingsBox greetings={this.props.ownGreetings} />
                </div>
            </div>
        );
    }
}

export default GreetingsMgmt;