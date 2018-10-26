import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject(stores => ({
  greetingTabsTitles: stores.store.greetingTabsTitles,
  setGreetingType: stores.store.setGreetingType,
  type: stores.store.currentGreetingType,
}))
@observer
class GreetingsTabs extends Component {
  render() {
    return (
      <div className='greeting-tabs-container'>
        {this.props.greetingTabsTitles.map(t =>
          (<span
            onClick={() => this.props.setGreetingType(t.id)}
            className={`greeting-tab ${this.props.type === t.id ? 'active-tab':''}`}
            key={t.id}>
            {t.title} {t.count > 0 && <span className='greeting-tab-pill'>{t.count}</span>}
          </span>)
        )}
      </div>
    );
  }
}

export default GreetingsTabs;