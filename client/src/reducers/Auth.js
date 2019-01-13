import {AUTH_GOOGLE, AUTH_FACEBOOK, AUTH_EMAIL, AUTH_SUCCESS, AUTH_FAIL} from '../actions/actionTypes';

let initialState ={
  googleAuthUrl: "https://accounts.google.com/o/oauth2/v2/auth?scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fdrive.metadata.readonly&include_granted_scopes=true&state=state_parameter_passthrough_value&redirect_uri=${'http://localhost:5000/api/login/google'}&response_type=token&client_id=${'84477259757-3di3d87li4lgq4pr7q7987h6n83f5boo.apps.googleusercontent.com",
  facebookAuthURL: `https://www.facebook.com/v3.2/dialog/oauth?client_id=794859637527349&redirect_uri=http://localhost:5000/api./login/facebook&state=123&response_type=code%20granted_scopes&scope=public_profile,email`,
  isLoggedIn: false,
  provider: "email"


}


export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_GOOGLE:
      return{
        ...state,
        provider: 'google'
      }
    case AUTH_FACEBOOK:
      return{
        ...state,
        provider: 'facebook'
      }
    case AUTH_EMAIL:
      return{
        ...state,
        provider: 'email'
      }
    default:
      return state;
  }
}
