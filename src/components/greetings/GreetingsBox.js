import React, { Component } from 'react';
import GreetingsTabs from './GreetingsTabs';
import Greetings from './Greetings';
import { inject, observer } from 'mobx-react';
import AddGreeting from './AddGreeting';

@inject(stores => ({
  getGreetingTypes: stores.store.getGreetingTypes
}))
@observer
class GreetingsBox extends Component {
  componentDidMount = () => {
    this.props.getGreetingTypes();
  };

  render() {
    return (
      <div>
        <GreetingsTabs />
        <Greetings />
        <AddGreeting />
      </div>
    );
  }
}

export default GreetingsBox;