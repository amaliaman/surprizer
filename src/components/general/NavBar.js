import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import LoginControl from '../login/LoginControl';

class NavBar extends Component {
    constructor() {
        super();
        this.links = [
            { title: 'Home', to: '/' },
            { title: 'My Events', to: '/events' },
            { title: 'Party', to: '/events/1/1/party' },
            { title: 'Greets', to: '/events/1/1/greetings' }
        ];
    }

    render() {
        return (
            <div className='nav-container'>
                {this.links.map((l, i) => <NavLink key={i} to={l.to} activeClassName='active-link' exact>{l.title}</NavLink>)}
                <LoginControl />
            </div>
        );
    }
}

export default NavBar;