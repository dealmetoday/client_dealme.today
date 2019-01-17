import axios from 'axios'
import {AUTH_FACEBOOK, AUTH_GOOGLE, AUTH_EMAIL, AUTH_SUCCESS, AUTH_FAIL, UPDATE_LOGIN} from "./actionTypes";
import CONFIGS from '../../../config/config_dev'

export const authFacebook = () => dispatch => {
  window.open(`http://localhost:5000/auth/login/facebook`)
}

export const authGoogle = () => dispatch => {
  window.open(`http://localhost:5000/auth/login/google`)
}

export const authEmail = (credentials) => dispatch => {

  axios.get(`${CONFIGS.SERVER_PATH}/auth/login/email`, {params: credentials}).then(response => {

    dispatch({
      type: AUTH_SUCCESS,
      payload: response.data


    })


  })


}

export const updateLogin = (user_id) => dispatch => {
  dispatch({
    type: UPDATE_LOGIN,
    payload: {
      userId: user_id,
      isLoggedIn: true
    }
  })
}