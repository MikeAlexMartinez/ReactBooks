const React = require('react');
const ReactDOM = require('react-dom');
const PropTypes = require('prop-types');

class Badge extends React.Component {
  render() {
    return (
      <div>
        <img
          src={this.props.img}
          alt='Avatar'
          style={{width: 100, height: 100}}
        />
        <h1>Name: {this.props.name}</h1>
        <h1>username: {this.props.username}</h1>
      </div>
    );
  }
}

Badge.propTypes = {
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};

ReactDOM.render(
  <Badge
    name='Tyler McGinnis'
    username='tylermcginnis'
    src='https://avators0.githubusercontent.com/u/2933430?v='
  />
)