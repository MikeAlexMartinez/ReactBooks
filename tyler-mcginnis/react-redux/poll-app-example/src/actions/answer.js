import { savePollAnswer } from '../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading';

// Action constant
export const ADD_ANSWER = 'ADD_ANSWER';

// Action Creator
function addAnswer ({ authedUser, id, answer }) {
  return {
    type: ADD_ANSWER,
    authedUser,
    id,
    answer
  }
}

export function handleAddAnswer (answerData) {
  return (dispatch) => {
    dispatch(showLoading());
    return savePollAnswer(answerData)
      .then(() => dispatch(addAnswer(answerData)))
      .then(() => dispatch(hideLoading()));
  }
}