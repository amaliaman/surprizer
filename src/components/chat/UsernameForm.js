import React, { Component } from 'react'

class UsernameForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
        }
        this.onSubmit = this.onSubmit.bind(this) //refactor
        this.onChange = this.onChange.bind(this)
    }

    onSubmit(e) {
        e.preventDefault()
        this.props.onSubmit(this.state.username)
    }

    onChange(e) {
        this.setState({ username: e.target.value })
    }

    render() {
        return (
            <div>
                <div>
                    {/* <h3>What is your name?</h3> */}
                    <form onSubmit={this.onSubmit}>
                        <input
                            type="text"
                            placeholder="Name"
                            onChange={this.onChange}
                            required
                        />
                        <br />
                        <button className='btn' type="submit">Join Chat</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default UsernameForm