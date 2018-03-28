import React from 'react';
import PropTypes from 'prop-types';

function PlayerPreview ({ avatar, username, children }) {
  return (
    <div>
      <div className='column'>
        <img 
          src={avatar}
          className='avatar'
          alt={`Avatar from ${username}`}
        ></img>
        <h3>@{username}</h3>
      </div>
      {children}
    </div>
  );
}

PlayerPreview.propTypes = {
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired
};

export default PlayerPreview;
