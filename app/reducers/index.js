import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import talky from './talky';

const rootReducer = combineReducers({
  talky,
  routing
});

export default rootReducer;
