import axios from 'axios'
import {HOME_INIT} from "./actionTypes";

export const homeInit = () => dispatch => {

  dispatch({
    type: HOME_INIT,
    payload: null
  })
}