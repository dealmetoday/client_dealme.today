import {combineReducers} from 'redux';
import stuff from './stuffReducer';
import auth from './auth';

const rootReducer = combineReducers({
  stuff,
  auth
});

export default rootReducer;