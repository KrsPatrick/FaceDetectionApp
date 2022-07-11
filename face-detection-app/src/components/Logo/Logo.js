import React from 'react';
import Tilt from 'react-parallax-tilt';
import './Logo.css'

const Logo = () => {
    return (
        <div>
        <div className='ma4 mt0'>
            <Tilt className='tilt br2 shadow-2'>
                <div style={{ height: '150px', width: '150px', background: 'linear-gradient(to right, rgb(162, 223, 84), rgb(166, 224, 174))' }}>
                    <h1>👀</h1>
                </div>
            </Tilt>
        </div>
    </div>)
}

export default Logo;