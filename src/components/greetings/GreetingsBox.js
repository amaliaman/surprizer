import React, { Component } from 'react';
import GreetingsTabs from './GreetingsTabs';
import Greetings from './Greetings';

 class GreetingsBox extends Component {
  render() {
    return (
      <div>
          <GreetingsTabs />
          <Greetings />        
      </div>
    );
  }
}

export default GreetingsBox;