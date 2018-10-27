import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import LoginControl from '../login/LoginControl';

class NavBar extends Component {
    constructor() {
        super();
        this.links = [
            { title: 'Surprizer', to: '/' },
            { title: 'My Events', to: '/events' },
            { title: 'About', to: '/about' }
        ];
    }

    render() {
        return (
            <div className='outer-wrapper'>
                <div className='container nav-container'>
                    {this.links.map((l, i) => <NavLink key={i} to={l.to} activeClassName='active-link' exact>{l.title}</NavLink>)}
                    <LoginControl />
                </div>
            </div>
        );
    }
}

export default NavBar;