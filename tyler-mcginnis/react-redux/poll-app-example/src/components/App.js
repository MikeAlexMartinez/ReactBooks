import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';

import LoadingBar from 'react-redux-loading';

import Dashboard from './Dashboard';
import LeaderBoard from './LeaderBoard';
import AddPoll from './AddPoll';
import Poll from './Poll';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  
  render() {
    return (
      <div>
        <LoadingBar />
        {this.props.loading === true
          ? null
          : <Poll match={{ params: {id: 'vthrdm985a262al8qx3do'}}}/>
        }
      </div>
    )
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App);
