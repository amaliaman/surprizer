import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Greeting from './Greeting';

@inject(stores => ({
    type: stores.store.currentGreetingType,
}))
@observer
class Greetings extends Component {
    render() {
        return (
            <div>
                {this.props.greetings &&
                    this.props.greetings
                        .filter(g => g.typeId === this.props.type)
                        .map(g => <Greeting key={g.id} greeting={g} />)}
            </div>
        );
    }
}

export default Greetings;