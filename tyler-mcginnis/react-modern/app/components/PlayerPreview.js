const React = require('react');
const PropTypes = require('prop-types');

function PlayerPreview (props) {
  return (
    <div>
      <div className='column'>
        <img 
          src={props.avatar}
          className='avatar'
          alt={'Avatar from ' + props.username}
        ></img>
        <h3>@{props.username}</h3>
      </div>
      {props.children}
    </div>
  );
}

PlayerPreview.propTypes = {
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired
};

module.exports = PlayerPreview;