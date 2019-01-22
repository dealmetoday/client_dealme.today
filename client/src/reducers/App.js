import {APP_INIT, CHANGE_PAGE} from '../actions/actionTypes';

const initialState = {
  googleAuthUrl: '',
  facebookAuthURL: '',
  isLoggedIn: false,
  pageValue: 0
}


export default (state = initialState, action) => {
  switch (action.type) {
    case APP_INIT:
      return {
        ...state
      };
    case CHANGE_PAGE:
      return {
        ...state,
        pageValue: action.payload
      }
    default:
      return state;
  }
}
