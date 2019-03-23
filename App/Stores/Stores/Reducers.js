/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */

import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { StoreTypes } from './Actions'

export const getStores = (state, {stores}) => {

  stores.map(aStore => {
    aStore["isStoreInRange"] = false
  })

  return ({
    ...state,
    stores
  })
}

export const resetToInitialState = (state) => {
  return ({
    ...INITIAL_STATE
  })
}

export const storeInRange = (state, {stores, uuid}) => {
  let storeToUpdate = stores.find(aStore => {
    return aStore._id === uuid
  })
  stores.splice(stores.indexOf(storeToUpdate),1);
  storeToUpdate.isStoreInRange = true
  stores.push(storeToUpdate)
  return({
    ...state,
    stores
  })
}

export const storeOutOfRange = (state, {stores, uuid}) => {
  let storeToUpdate = stores.find(aStore => {
    return aStore._id === uuid
  })
  stores.splice(stores.indexOf(storeToUpdate),1);
  storeToUpdate.isStoreInRange = false
  stores.push(storeToUpdate)
  return({
    ...state,
    stores
  })
}





/**
 * @see https://github.com/infinitered/reduxsauce#createreducer
 */
export const reducer = createReducer(INITIAL_STATE, {
  [StoreTypes.GET_STORES]: getStores,
  [StoreTypes.RESET_TO_INITIAL_STATE]: resetToInitialState,
  [StoreTypes.STORE_IN_RANGE]: storeInRange,
  [StoreTypes.STORE_OUT_OF_RANGE]: storeOutOfRange



})
