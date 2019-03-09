/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */

import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { AuthTypes } from './Actions'

export const loginFacebookSuccess = (state, {Bearer, id}) => {

  const config = {
    Bearer: Bearer,
    'Content-Type': 'application/json'
  }
  return ({
    ...state,
    id,
    config,
    signInMethod: 'social',
    isLoggedIn: true
  })


}

export const loginEmailSuccess = (state, {Bearer,id}) => {
  const config = {
    Bearer: Bearer,
    'Content-Type': 'application/json'
  }
  return ({
    ...state,
    id,
    config,
    signInMethod: 'social',
    isLoggedIn: true
  })

}

export const loginGoogleSuccess = (state, {Bearer, id}) => {
  const config = {
      Bearer: Bearer,
      'Content-Type': 'application/json'
  }
  return ({
    ...state,
    config,
    id,
    signInMethod: 'social',
    isLoggedIn: true
  })
}

export const updateUserProfile = (state, {profile}) => {
  return ({
    ...state,
    profile
  })
}

export const updatePubKey = (state, {pubKey}) => {
  return ({
    ...state,
    pubKey
  })
}

/**
 * @see https://github.com/infinitered/reduxsauce#createreducer
 */
export const reducer = createReducer(INITIAL_STATE, {
  [AuthTypes.LOGIN_GOOGLE_SUCCESS]: loginGoogleSuccess,
  [AuthTypes.LOGIN_FACEBOOK_SUCCESS]: loginFacebookSuccess,
  [AuthTypes.UPDATE_USER_PROFILE]: updateUserProfile,
  [AuthTypes.UPDATE_PUB_KEY]: updatePubKey,
  [AuthTypes.LOGIN_EMAIL_SUCCESS]: loginEmailSuccess

})
