import React, { Component } from 'react';

class About extends Component {
    render() {
        return (
            <div className='outer-wrapper about banner'>
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
                    <h4><a href='https://unsplash.com' target='_blank' rel="noopener noreferrer">unsplash.com</a></h4>
                    <ul>
                        <li>Ambreen Hasan</li>
                        <li>Jason Leung</li>
                        <li>Pablo Heimplatz</li>
                        <li>Adi Goldstein</li>
                        <li>Monique Carrati</li>
                        <li>rawpixel</li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default About;