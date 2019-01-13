import {SEND_GOOGLE_PARAMS} from "./actionTypes";
import axios from 'axios'
import {authFacebook, authGoogle} from "./Auth";
import CONFIGS from '../../../config/config_dev'

export const sendParams = (params) => dispatch => {
  console.log(params)
  axios.post(`${CONFIGS.SERVER_PATH}/api/auth/google`, params).then(resp => {

  })


}
