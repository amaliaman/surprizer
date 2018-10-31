import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import LoginControl from '../login/LoginControl';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';

@observer
class NavBar extends Component {
    @observable isChecked = false;

    constructor() {
        super();
        this.links = [
            { title: 'My Events', to: '/events' },
            { title: 'About', to: '/about' }
        ];
    }

    @action handleCheck = e => {
        this[e.target.name] = e.target.checked;
    };

    @action handleClick = e => {
        this.isChecked = false;
    };

    render() {
        return (
            <header className="header">
                <div className='outer-wrapper'>
                    <div className='container'>
                        <NavLink onClick={this.handleClick} activeClassName='active-link' to="/" className="logo" exact><span role="img" aria-label="Surprizer title">🎉</span> Surprizer</NavLink>
                        <input name='isChecked' checked={this.isChecked} onChange={this.handleCheck} className="menu-btn" type="checkbox" id="menu-btn" />
                        <label className="menu-icon" htmlFor="menu-btn"><span className="navicon"></span></label>
                        <ul className="menu">
                            {this.links.map((l, i) => <li onClick={this.handleClick} key={i}><NavLink to={l.to} activeClassName='active-link' exact>{l.title}</NavLink></li>)}
                            <li onClick={this.handleClick}><LoginControl /></li>
                        </ul>
                    </div>
                </div>
            </header>
        );
    }
}

export default NavBar;