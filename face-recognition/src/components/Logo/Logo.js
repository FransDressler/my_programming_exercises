import React from 'react';
import Tilt from 'react-parallax-tilt';
import './Logo.css';

const Logo = () => {
    return (
        <div className="ma4 mt0">
            <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} >
              <div className="br2 shadow-2 tilt"style={{ height: '150px',width: '150px' }}>
                <h1>Logo</h1>
              </div>
            </Tilt>
        </div>
    )
};
export default Logo;