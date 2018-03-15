const React = require('react');
const PropTypes = require('prop-types');
const api = require('../utils/api');

/* stateless functional component */
function Language(props) {
  return (
    <li 
      style={props.style}
      onClick={props.onClick}
    >{props.language}</li>
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
function SelectLanguage(props) {
  const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
  return (
    <ul className="languages">
      {languages.map(function (lang) {
        return (
          <Language
            key={lang}
            language={lang}
            style={lang === props.selectedLanguage ? { color: '#d0021b' } : null}
            onClick={props.onSelect.bind(null, lang)}
          />
        );
      })}
    </ul>
  );
}

SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

function Repo(props) {
  const repo = props.repo;
  const index = props.index;
  return (
    <li className='popular-item'>
      <div className='popular-rank'>#{index + 1}</div>
      <ul className='space-list-items'>
        <li>
          <img
            className='avatar'
            src={repo.owner.avatar_url}
            alt={'Avatar for ' + repo.owner.login}
          />
        </li>
        <a href={repo.html_url}>{repo.name}</a>
        <li>@{repo.owner.login}</li>
        <li>{repo.startgazers_count} stars</li>
      </ul>
    </li>
  );
}

RepoGrid.propTypes = {
  repo: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

function RepoGrid (props) {
  return (
    <ul className='popular-list'>
      {props.repos.map(function (repo, index) {
        return (
          <Repo key={repo.name} repo={repo} index={index} />
        );
      })}
    </ul>
  );
}

RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired,
};

class Popular extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      selectedLanguage: 'All',
      repos: [],
    };
    this.updateLanguage = this.updateLanguage.bind(this);
  }

  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage);
  }
  
  updateLanguage(lang) {
    this.setState(function () {
      return {
        repos: [],
        selectedLanguage: lang
      }
    });

    api.fetchPopularRepos(this.state.selectedLanguage)
      .then(function res(repos) {
        this.setState(function() {
          return {
            repos: repos
          };
        });
      }.bind(this));
  }
  
  render() {
    return (
      <div>
        <SelectLanguage 
          selectedLanguage={this.state.selectedLanguage}
          onSelect={this.updateLanguage}
        />
        {!this.state.repos
          ? <p>Loading...</p>
          : <RepoGrid
              repos={this.state.repos}
            />
        }
      </div>
    );
  }
}

module.exports = Popular;
