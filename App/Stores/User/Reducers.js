/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */

import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { AuthTypes } from './Actions'

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



/**
 * @see https://github.com/infinitered/reduxsauce#createreducer
 */
export const reducer = createReducer(INITIAL_STATE, {
  [AuthTypes.GET_USER_PROFILE]: getUserProfile,
  [AuthTypes.UPDATE_USER_PROFILE]: updateUserProfile

})
