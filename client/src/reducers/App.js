import {APP_INIT} from '../actions/actionTypes';
import initialState from "./initialState";

initialState ={
  googleAuthUrl: '',
  facebookAuthURL: '',
  isLoggedIn: false


}


export default (state = initialState, action) => {
  switch (action.type) {
    case APP_INIT:
      return {
        ...state
      };
    default:
      return state;
  }
}
