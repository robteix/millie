import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import millie from './millie';

const rootReducer = combineReducers({
  millie,
  routing
});

export default rootReducer;
