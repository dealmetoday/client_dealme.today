import {combineReducers} from 'redux';
import stuff from './stuffReducer';
import auth from './auth';
import user from './user';

const rootReducer = combineReducers({
  stuff,
  auth,
  user
});

export default rootReducer;