import axios from 'axios'
import {AUTH_SUCCESS, UPDATE_LOGIN} from "./actionTypes";
import configs from '../../../config/config'

export const authFacebook = () => dispatch => {
  window.open(`${configs.SERVER_URL}/auth/login/facebook`)
}

export const authGoogle = () => dispatch => {
  console.log("Hi")
  window.open(`${configs.SERVER_URL}/auth/login/google`, '_self');
}

export const authEmail = (credentials) => dispatch => {

  axios.get(`${configs.SERVER_PATH}/auth/login/email`, {params: credentials}).then(response => {
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