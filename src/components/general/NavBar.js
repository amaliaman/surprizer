import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import LoginControl from '../login/LoginControl';

class NavBar extends Component {
    constructor() {
        super();
        this.links = [
            // { title: '🎉', to: '/' },
            // { title: 'Surprizer', to: '/' },
            { title: 'My Events', to: '/events' },
            { title: 'About', to: '/about' }
        ];
    }

    render() {
        return (
            <header className="header">
                <div className='outer-wrapper'>
                    <div className='container'>
                        <NavLink activeClassName='active-link'  to="/" className="logo" exact><span role="img" aria-label="Surprizer title">🎉</span> Surprizer</NavLink>
                        <input className="menu-btn" type="checkbox" id="menu-btn" />
                        <label className="menu-icon" htmlFor="menu-btn"><span className="navicon"></span></label>
                        <ul className="menu">
                            {this.links.map((l, i) => <li key={i}><NavLink to={l.to} activeClassName='active-link' exact>{l.title}</NavLink></li>)}
                            <li><LoginControl /></li>
                        </ul>
                    </div>
                </div>
            </header>

            // <div className='outer-wrapper nav-wrapper'>
            //     <div className='container nav-container'>
            //         {this.links.map((l, i) => <NavLink key={i} to={l.to} activeClassName='active-link' exact>{l.title}</NavLink>)}
            //         <LoginControl />
            //     </div>
            // </div>
        );
    }
}

export default NavBar;