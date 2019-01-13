import {combineReducers} from 'redux';
import stuff from './stuffReducer';
import Auth from './Auth';

const rootReducer = combineReducers({
  stuff,
  Auth
});

export default rootReducer;