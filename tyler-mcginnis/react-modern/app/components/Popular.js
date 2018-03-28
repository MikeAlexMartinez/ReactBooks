import React from 'react';
import PropTypes from 'prop-types';
import { fetchPopularRepos } from '../utils/api';

import Loading from './Loading';

/* stateless functional component */
function Language({ style, onClick, language }) {
  return (
    <li 
      style={style}
      onClick={onClick}
    >{language}</li>
  );
}

Language.propTypes = {
  language: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  style: PropTypes.shape({
      color: PropTypes.string
    }),
};

/* stateless functional component */
function SelectLanguage({ selectedLanguage, onSelect }) {
  const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
  return (
    <ul className="languages">
      {languages.map((lang) => (
        <Language
          key={lang}
          language={lang}
          style={lang === selectedLanguage ? { color: '#d0021b' } : null}
          onClick={() => onSelect(lang)}
        />
      ))}
    </ul>
  );
}

SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

function Repo({ repo, index }) {
  const { owner, html_url, stargazers_count, name } = repo;
  return (
    <li className='popular-item'>
      <div className='popular-rank'>#{index + 1}</div>
      <ul className='space-list-items'>
        <li>
          <img
            className='avatar'
            src={owner.avatar_url}
            alt={`Avatar for ${owner.login}`}
          />
        </li>
        <a href={html_url}>{name}</a>
        <li>@{owner.login}</li>
        <li>{stargazers_count} stars</li>
      </ul>
    </li>
  );
}

RepoGrid.propTypes = {
  repo: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

function RepoGrid ({ repos }) {
  return (
    <ul className='popular-list'>
      {repos.map((repo, index) => (
        <Repo key={repo.name} repo={repo} index={index} />
      ))}
    </ul>
  );
}

RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired,
};

export default class Popular extends React.Component {
  state = {
    selectedLanguage: 'All',
    repos: [],
  };

  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage);
  }
  
  updateLanguage = async (lang) => {
    this.setState(() => ({
      repos: [],
      selectedLanguage: lang
    }));

    const repos = await fetchPopularRepos(this.state.selectedLanguage); 
    this.setState(() => ({ repos }));
  }
  
  render() {
    const { selectedLanguage, repos } = this.state;
    return (
      <div>
        <SelectLanguage 
          selectedLanguage={selectedLanguage}
          onSelect={this.updateLanguage}
        />
        {repos.length === 0
          ? <Loading text='Downloading' />
          : <RepoGrid
              repos={repos}
            />
        }
      </div>
    );
  }
}
