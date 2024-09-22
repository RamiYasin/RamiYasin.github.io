import React from 'react';
import { useNavigate } from 'react-router-dom';
import './WelcomePage.css'; // Import the CSS file for styles
import roImage from './assets/ro.jpg'; // Adjust the path as necessary

export default function WelcomePage() {
   const navigate = useNavigate();
    
    const onPress = () => {
        navigate('/chat'); // Change to the route you want to navigate to
    };

    return (
        <div className="maincontainer">
            <div className="titelcontainer">
                <h1 className="titeltext">Welcome to RamisGPT</h1>
            </div>
            <div className="imagecontainer">
                <img src={roImage} alt="RamisGPT" className="image" />
            </div>
            <div className="buttoncontainer">
                <p className="DescText">Start using RamisGPT, it's free, Ask anything</p>
                <button className="button" onClick={onPress}>
                    <span className="text">Start</span>
                </button>
            </div>
        </div>
    );
}
