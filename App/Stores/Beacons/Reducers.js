/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */

import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { BeaconTypes } from './Actions'

export const updateBeacons = (state, {beacons}) => {
  return ({
    ...state,
    beacons
  })
}






/**
 * @see https://github.com/infinitered/reduxsauce#createreducer
 */
export const reducer = createReducer(INITIAL_STATE, {
  [BeaconTypes.UPDATE_BEACONS]: updateBeacons,

})
