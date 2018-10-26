import React, { Component } from 'react';
import Loader from 'react-loader-spinner';

export class CustomLoader extends Component {
    render() {
        return (
            <div>
                {this.props.isLoading ?
                    (<div className="loader-container">
                        <Loader type="Circles" color="#9c27b0" height={this.props.height || 80} />
                    </div>)
                    :
                    <div>{this.props.children}</div>
                }
            </div>
        )
    }
}

export default CustomLoader;