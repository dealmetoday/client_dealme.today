import axios from 'axios'
import {AUTH_FACEBOOK, AUTH_GOOGLE, AUTH_EMAIL, AUTH_SUCCESS, AUTH_FAIL} from "./actionTypes";
import CONFIGS from '../../../config/config_dev'

export const authFacebook = () => dispatch => {
  window.open(`http://localhost:5000/api/auth/login/facebook`)
}

export const authGoogle = () => dispatch => {

  window.open(`http://localhost:5000/api/auth/login/google`)

 /* axios.get(`${CONFIGS.SERVER_PATH}/api/auth/login/google`, (req,resp) =>
  {
    dispatch({
      type: AUTH_GOOGLE,
      payload: null
    })
  })*/
}