import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import './GamesPage.css';

const GamesPage = () => {
    const navigate = useNavigate();
    
    const handleExitClick = () => {
        console.log("clicked");
        navigate('/'); // Navigate to the homepage
    };

    const handleGameClick = () => {
        console.log("clickedgame");
        navigate('/quiz'); // Navigate to the quiz page
    };

    return (
        <div className="game-page">
            <h1 className="header">GamesPage</h1>
            <hr />
            <div className="container">
                <div className="row">
                    <div className="col-6">
                        <img 
                            src={require('./images/Bird.png')} 
                            className="bird-img" 
                            onClick={handleGameClick} // Corrected to pass function reference
                            style={{ cursor: 'pointer' }}
                            alt="Game Bird"
                        />
                    </div>
                    <div className="col-6">
                        <img 
                            src={require('./images/Bird.png')} 
                            className="bird-img" 
                            style={{ cursor: 'pointer' }}
                            alt="Game Bird"
                        />
                    </div>
                    <div className="col-6">
                        <img 
                            src={require('./images/Bird.png')} 
                            className="bird-img" 
                            style={{ cursor: 'pointer' }}
                            alt="Game Bird"
                        />
                    </div>
                    <div className="col-6">
                        <img 
                            src={require('./images/Bird.png')} 
                            className="bird-img" 
                            style={{ cursor: 'pointer' }}
                            alt="Game Bird"
                        />
                    </div>
                </div>

                <button className="btn-exit lilita-one-regular" onClick={handleExitClick}>
                    EXIT
                </button>
            </div>
        </div>
    );
};

export default GamesPage;
