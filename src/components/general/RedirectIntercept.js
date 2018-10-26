import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { inject, observer } from 'mobx-react';
import { action } from 'mobx';

@inject(stores => ({
    redirectTo: stores.store.redirectTo,
    resetRedirectTo: stores.store.resetRedirectTo,
}))
@observer
class RedirectIntercept extends Component {
    @action componentDidMount = () => {
        this.props.resetRedirectTo();
    };

    render() {
        const { redirectTo } = this.props;
        return <Redirect to={redirectTo} />
    }
}

export default RedirectIntercept;