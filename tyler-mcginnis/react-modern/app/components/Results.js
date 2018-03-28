import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import queryString from 'query-string';

import PlayerPreview from './PlayerPreview';
import Reset from './Reset';
import Loading from './Loading';

import { battle } from '../utils/api';

function Profile ({ info }) {
  const {avatar_url, login, name, location, company, followers, following, blog, public_repos } = info;
  return (
    <PlayerPreview avatar={avatar_url} username={login}>
      <ul className='space-list-items'>
        {name && <li>{name}</li>}
        {location && <li>{location}</li>}
        {company && <li>{company}</li>}
        <li>Followers: {followers}</li>
        <li>Following: {following}</li>
        <li>Public Repos: {public_repos}</li>
        {blog && <li><a href={blog}>{blog}</a></li>}
      </ul>
    </PlayerPreview>
  )
}

Profile.propTypes = {
  info: PropTypes.object.isRequired,
};

function Player ({ label, score, profile }) {
  return (
    <div>
      <h1 className='header'>{label}</h1>
      <h3 style={{textAlign: 'center'}}>Score: {score}</h3>
      <Profile 
        info={profile}
      />
    </div>
  );
}

Player.propTypes = {
  label: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  profile: PropTypes.object.isRequired,
}

export default class Results extends React.Component {
  state = {
    winner: null,
    loser: null,
    error: null,
    loading: true,
  }
  
  async componentDidMount() {
    const { location } = this.props;
    const { playerOneName, playerTwoName } = queryString.parse(location.search);

    
    const [winner, loser] = await battle([playerOneName, playerTwoName]);
    winner === null || loser === null
      ? this.setState(() => ({
          error: `Looks like there was an error. Check that both users exist on github`,
          loading: false,
        }))
      : this.setState(() => ({
          error: null,
          winner,
          loser,
          loading: false,
        }));
  }
  
  render() {
    const { winner, loser, error, loading } = this.state;
    if (loading) {
      return <Loading text='Battling' speed={200} />;
    }

    if(error) {
      return (
        <div>
          <p>{error}</p>
          <Link to='/battle'>Reset</Link>
        </div>
      );
    }

    return (
      <div className='row'>
        <div className='column'>
          <Player
            label='winner'
            score={winner.score}
            profile={winner.profile}
          />
        </div>
        <div className='column'>
          <Player
            label='loser'
            score={loser.score}
            profile={loser.profile}
          />
        </div>
      </div>
    )
  }
}
