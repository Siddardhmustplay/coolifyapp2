import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';

const HomePage = () => {
  const [username, setUsername] = useState('');
  const [gameUrl, setGameUrl] = useState(''); 
  const navigate = useNavigate();

  // Extract username from URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const usernameParam = urlParams.get('username');
    
    if (usernameParam) {
      setUsername(usernameParam);
      fetchGameUrl(usernameParam);
    }
  }, []);

  // Function to fetch game URL from the backend
  const fetchGameUrl = async (username) => {
    try {
      const response = await fetch(`https://your-backend-url.com/generate-game-url?username=${encodeURIComponent(username)}`);
      const data = await response.json();
      setGameUrl(data.gameUrl);
    } catch (error) {
      console.error("Failed to fetch game URL:", error);
    }
  };

  const handleStartClick = () => {
    navigate('/games');
  };

  const handleSettingsClick = () => {
    navigate('/settings')
  };

  return (
    <div className="game-page">
      <div className="container">
        <div className="row">
          <div className="col-4">
            <button className="btn-back lilita-one-regular">BACK</button>
          </div>
          <div className="col-4">
            <div className='coins lilita-one-regular'>Coins</div>
          </div>
          <div className="col-4">
            <img 
              src={require('./images/settings.png')} 
              className="set-img" 
              alt="Settings"
              onClick={handleSettingsClick} 
              style={{ cursor: 'pointer' }} // Add cursor pointer
            />
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-4"></div>
          <div className="col-4">
            <button className="start-btn lilita-one-regular" onClick={handleStartClick}>PLAY</button>
          </div>
          <div className="col-4"></div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
