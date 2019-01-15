import axios from 'axios'
import {AUTH_FACEBOOK, AUTH_GOOGLE, AUTH_EMAIL, AUTH_SUCCESS, AUTH_FAIL} from "./actionTypes";
import CONFIGS from '../../../config/config_dev'

export const authFacebook = () => dispatch => {
  window.open(`http://localhost:5000/auth/login/facebook`)
}

export const authGoogle = () => dispatch => {
  window.open(`http://localhost:5000/auth/login/google`)
}

export const authEmail = (credentials) => dispatch => {

  axios.put(`${CONFIGS.SERVER_PATH}/auth/login/email`, {params: credentials}).then(response => {

    dispatch({
      type: AUTH_SUCCESS,
      payload: response.data


    })


  })


}