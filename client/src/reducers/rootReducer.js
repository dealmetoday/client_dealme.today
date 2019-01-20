import {combineReducers} from 'redux';
import stuff from './stuffReducer';
import auth from './auth';
import user from './user';
import app from './App';
import deals from './Deals';

const rootReducer = combineReducers({
  stuff,
  auth,
  user,
  app,
  deals
});

export default rootReducer;