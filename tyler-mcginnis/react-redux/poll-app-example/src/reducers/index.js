import { combineReducers } from 'redux';
import { loadingBarReducer } from 'react-redux-loading';

import authedUser from './authedUser';
import polls from './polls';
import users from './users';

export default combineReducers({
  authedUser,
  users,
  polls,
  loadingBar: loadingBarReducer
});
