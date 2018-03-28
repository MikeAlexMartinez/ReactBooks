import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

class FriendsList extends React.Component {
  componentDidMount () {
    return axios.get(this.props.url).then(this.props.callback)
  }
  
  render() {
    const {list} = this.props;
    const friends = list.filter(({friend}) => friend);
    const nonfriends = list.filter(({friend}) => !friend);
    const createList = (arr) => arr.map(({name}) => <li>{name}</li>);

    return (
      <div>
        <h1>Friends</h1>
        <ul>{createList(friends)}</ul>

        <hr />

        <h1>Non Friends</h1>
        <ul>{createList(nonfriends)}</ul>
      </div>
    )
  }
}

Users.PropTypes = {
  list: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        friend: PropTypes.bool.isRequired,
      })
    ).isRequired,
};

export default FriendsList;
