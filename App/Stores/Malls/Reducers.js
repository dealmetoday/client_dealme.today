/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */

import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { MallTypes } from './Actions'

export const getMalls = (state, {malls}) => {

  return ({
    ...state,
    malls
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
  [MallTypes.GET_MALLS]: getMalls,
  [MallTypes.RESET_TO_INITIAL_STATE]: resetToInitialState


})
