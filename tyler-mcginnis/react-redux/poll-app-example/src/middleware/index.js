import thunk from 'redux-thunk';
import { applyMiddleware } from 'redux';
import { composeEnhancers } from './composeEnhancer';

import logger from './logger';

export default composeEnhancers(
  applyMiddleware(
    thunk,
    logger
  )
);
