/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */

import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { StoreTypes } from './Actions'

export const getStores = (state, {stores}) => {

  return ({
    ...state,
    stores
  })
}






/**
 * @see https://github.com/infinitered/reduxsauce#createreducer
 */
export const reducer = createReducer(INITIAL_STATE, {
  [StoreTypes.GET_STORES]: getStores,

})
