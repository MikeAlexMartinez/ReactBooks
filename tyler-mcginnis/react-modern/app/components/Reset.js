const React = require('react');
const PropTypes = require('prop-types');

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

module.exports = Reset;