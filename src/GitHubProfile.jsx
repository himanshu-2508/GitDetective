import React, { useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function GitHubProfile() {
  const [username, setUsername] = useState('');
  const [userDetails, setUserDetails] = useState(null);
  const [notFound, setNotFound] = useState(false); // New state for user not found
  const [isDarkMode, setIsDarkMode] = useState(false);
  const inputFieldRef = useRef(null);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const searchUserDetails = async () => {
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (response.ok) {
        const data = await response.json();
        setUserDetails(data);
        setNotFound(false); // Reset the notFound state
      } else {
        setUserDetails(null);
        setNotFound(true); // Set notFound state to true
      }
    } catch (error) {
      setUserDetails(null);
      setNotFound(true); // Set notFound state to true
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      searchUserDetails();
    }
  };

  return (
    <div id="wrapper">
      <nav className="navbar navbar-dark bg-primary">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">GitDetective</span>
        </div>
      </nav>
      <div className="container">
        <div className="input-group mt-5">
          <input
            type="text"
            className="form-control"
            placeholder="Enter a GitHub username..."
            id="usernameInputField"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyPress={handleKeyPress}
            ref={inputFieldRef}
            aria-label="Enter a GitHub username..."
            aria-describedby="button-addon2"
          />
          <button className="btn  btn-lg btn-primary" type="button" id="button-addon2" onClick={searchUserDetails}>
            Search
          </button>
        </div>
        {notFound && (
          <div className="alert alert-danger mt-3" role="alert">
            User not found. Please enter a valid GitHub username.
          </div>
        )}
        <div id="userDetails" className={userDetails ? 'hehe active' : 'hehe'}>
          <div className="userDetails-img">
            {userDetails && <img src={userDetails.avatar_url} alt="User Avatar" style={{ height: '100%', borderRadius: '100%' }} />}
          </div>
          {<div className="userDetails-txt">
            <div className="userDetails-txtName">
              <p><span hehe-userName>{userDetails ? userDetails.name : ''}</span><br /> <a href=""><span hehe-userUserName className="userNameOfUser">{userDetails ? `@${userDetails.login}` : ''}</span></a></p>
              <p hehe-dateOfJoin>{userDetails ? userDetails.created_at.substring(0, 10) : ''}</p>
            </div>
            <div className="userDetails-txtAbout">{userDetails ? userDetails.bio : ''}</div>
            <div className="userDetails-txtData">
              <div className="githubDataValue">Repos <br /><p hehe-repoNum className="githubDataValueNum">{userDetails ? userDetails.public_repos : ''}</p></div>
              <div className="githubDataValue">Followers <br /><p hehe-followers className="githubDataValueNum">{userDetails ? userDetails.followers : ''}</p></div>
              <div className="githubDataValue">Following <br /><p hehe-following className="githubDataValueNum">{userDetails ? userDetails.following : ''}</p></div>
            </div>
            <div className="userDetails-txtContactInfo">
              <div className="userDetails-txtContactInfoBox">
                <div className="userDetails-txtContactInfoBoxValues"><i className="fa-solid fa-location-dot icons"></i><span hehe-location>{userDetails ? userDetails.location || 'N/A' : ''}</span></div>
                <div className="userDetails-txtContactInfoBoxValues"><i className="fa-brands fa-x-twitter icons"></i> <span hehe-twitter>{userDetails ? userDetails.twitter_username || 'N/A' : ''}</span></div>
              </div>
              <div className="userDetails-txtContactInfoBox">
                <div className="userDetails-txtContactInfoBoxValues"><i className="fa-solid fa-link icons"></i> <span hehe-gitLink>{userDetails ? userDetails.html_url : ''}</span></div>
                <div className="userDetails-txtContactInfoBoxValues"><i className="fa-brands fa-square-instagram icons"></i> <span hehe-instaLink>{userDetails ? userDetails.instagram_username || 'N/A' : ''}</span></div>
              </div>
            </div>
          </div>
          }
        </div>
      </div>
    </div>
  );
}

export default GitHubProfile;

