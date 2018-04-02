import React, { Component } from 'react';
import { connect } from 'react-redux';

class Poll extends Component {
  render() {
    const { match, polls } = this.props;
    const pollId = match.params.id;

    return (
      <div>
        <h3></h3>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, polls, usrs }, { match }) {
  const { id } = match.params;
  const poll = polls[id];

  if (!poll) {
    return {
      poll: null,
    };
  }

  
}

export default connect(mapStateToProps)(Poll);