const React = require('react');
const ReactDOM = require('react-dom');
const PropTypes = require('prop-types');

class User extends React.Component {
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

ReactDOM.render(
  <Users
    list={[
      { name: 'Tyler', friend: true },
      { name: 'Ryan', friend: true },
      { name: 'Michael', friend: false },
      { name: 'Mikenzi', friend: false },
      { name: 'Jessica', friend: true },
      { name: 'Dan', friend: false },  
    ]}
  />,
  document.getElementById('root')
);