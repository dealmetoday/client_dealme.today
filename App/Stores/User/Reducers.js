/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */

import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { AuthTypes, UserTypes } from "./Actions";
import { TagTypes } from "../Tags/Actions";

export const getUserProfile = (state, {profile}) => {
  return ({
    ...state,
    profile
  })
}



export const updateUserProfile = (state, {profile}) => {
  return ({
    ...state,
    profile
  })
}

export const resetToInitialState = (state) => {
  return ({
    ...INITIAL_STATE
  })
}




/**
 * @see https://github.com/infinitered/reduxsauce#createreducer
 */
export const reducer = createReducer(INITIAL_STATE, {
  [UserTypes.GET_USER_PROFILE]: getUserProfile,
  [UserTypes.UPDATE_USER_PROFILE]: updateUserProfile,
  [UserTypes.RESET_TO_INITIAL_STATE]: resetToInitialState
})
