import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import PlayerPreview from './PlayerPreview';
import Reset from './Reset';

class PlayerInput extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
  }

  static defaultProps = {
    label: 'Username',
  }
  
  state = {
    username: ''
  }
  
  handleChange = (event) => {
    const val = event.target.value;
    this.setState(() => ({ username: val}));
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(
      this.props.id,
      this.state.username
    );
  }

  render() {
    const { username } = this.state;
    const { label } = this.props; 
    return (
      <form className='column' onSubmit={this.handleSubmit}>
        <label className='header' htmlFor='username'>
          {label}
        </label>
        <input
          id='username'
          placeholder='github username'
          type='text'
          autoComplete='off'
          value={username}
          onChange={this.handleChange}
        />
        <button 
          className='button'
          type='submit'
          disabled={!username}
        >
          Submit
        </button>
      </form>
    );
  }
}

class Battle extends React.Component {
  state = {
    playerOneName: '',
    playerOneImage: null,
    playerTwoName: '',
    playerTwoImage: null,
  }
  
  handleSubmit = (id, username) => {
    this.setState(() => ({
      [id+'Name']: username,
      [id+'Image']: `https://github.com/${username}.png?size=200`,
    }));
  }

  handleReset = (id) => {
    this.setState(() => ({
      [id+'Name']: '',
      [id+'Image']: null,
    }));
  }

  render() {
    const { match } = this.props;
    const { playerOneName, playerOneImage, playerTwoName, playerTwoImage } = this.state;
    return (
      <div>
        <div className='row'>
          {!playerOneName && 
            <PlayerInput 
              id='playerOne'
              label='Player One'
              onSubmit={this.handleSubmit}
            />
          }
          {playerOneImage !== null &&
            <div>
              <PlayerPreview
                avatar={playerOneImage}
                username={playerOneName}
              />
              <Reset 
                id='playerOne'
                onReset={this.handleReset}
              />
            </div>
          }
          {!playerTwoName &&
            <PlayerInput 
              id='playerTwo'
              label='Player Two'
              onSubmit={this.handleSubmit}
            />
          }
          {playerTwoImage !== null &&
            <div>
              <PlayerPreview
                avatar={playerTwoImage}
                username={playerTwoName}
              >
                <Reset
                  id='playerTwo'
                  onReset={this.handleReset}
                />
              </PlayerPreview>
            </div>
          }
        </div>
        {playerTwoImage &&
         playerOneImage &&
          <Link
            className='button'
            to={{
              pathname: `${match.url}/results`,
              search: `?playerOneName=${playerOneName}&playerTwoName=${playerTwoName}`
            }}
          >
            Battle!
          </Link>
        }
      </div>
    );
  }
}

export default Battle;
