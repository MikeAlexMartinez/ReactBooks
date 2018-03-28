import React from 'react';
import PropTypes from 'prop-types';

function Reset (props) {
  return (
    <button
      className='reset'
      onClick={props.onReset.bind(null, props.id)}
    >Reset</button>
  )
}

Reset.propTypes = {
  id: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired
};

export default Reset;
