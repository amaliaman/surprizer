import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Greeting from './Greeting';

@inject(stores => ({
    greetings: stores.store.currentGreetings
}))
@observer
class Greetings extends Component {
    render() {
        return (
            <div>
                {this.props.greetings.map(g => <Greeting key={g.id} greeting={g} />)}
            </div>
        );
    }
}

export default Greetings;
