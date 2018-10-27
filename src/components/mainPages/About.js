import React, { Component } from 'react';

class About extends Component {
    render() {
        return (
            <div className='outer-wrapper about'>
                <div className='container'>

                    <div className='hero'>
                        <div>
                            <div className='title'>About</div>
                            <div className='description'>A little bit about Surprizer and me.</div>
                        </div>
                    </div>


                    <h3>About Me</h3>
                    <div>I'm me</div>

                    <h3>Photo Credits</h3>
                    <ul>
                        <li>Photo by Jason Leung on Unsplash</li>
                        <li>Photo by Adi Goldstein on Unsplash</li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default About;