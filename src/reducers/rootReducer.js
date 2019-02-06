import {combineReducers} from 'redux';
import auth from './auth';
import user from './user';
import app from './App';
import deals from './Deals';
import mall from './mall'

const rootReducer = combineReducers({
  auth,
  user,
  app,
  deals,
  mall
});

export default rootReducer;