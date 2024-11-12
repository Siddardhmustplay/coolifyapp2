import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Settings.css';
import { useNavigate } from 'react-router-dom';

const SettingsPage = () => {
  const [isVolumeOn, setIsVolumeOn] = useState(true); // Track volume state
  const navigate = useNavigate();

  const toggleVolume = (isOn) => {
    setIsVolumeOn(isOn);
  };

  const handleExitClick = () => {
    console.log("clicked");
    navigate('/'); // Navigate to the homepage
  };

  return (
    <div className="game-page">
      <div className="container">
        <h1 className="header lilita-one-regular">Settings</h1>
        <hr></hr>
        <div className="row">
          <div className="col-md-6 user-block lilita-one-regular">
            Username
          </div>
          <div className="col-md-6 user-block lilita-one-regular">
            Volume
            <div className="volume-buttons">
              <button 
                className={`btn-sound ${!isVolumeOn ? 'active' : ''}`} 
                onClick={() => toggleVolume(false)}
              >
                OFF
              </button>
              <button 
                className={`btn-sound ${isVolumeOn ? 'active' : ''}`} 
                onClick={() => toggleVolume(true)}
              >
                ON
              </button>
            </div>
          </div>
          <div className="col-md-6 user-block lilita-one-regular">
            HELP
          </div>
        </div>
        {/* Use the correct function reference without parentheses */}
        <button className="btn-exit lilita-one-regular" onClick={handleExitClick}>EXIT</button>
      </div>
    </div>
  );
};

export default SettingsPage;
