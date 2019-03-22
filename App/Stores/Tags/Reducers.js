/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */

import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { AuthTypes, TagTypes } from "./Actions";

export const getTags = (state, {tags}) => {

  let tagList = []

  for(let aTag of tags){
    tagList.push({
      id: aTag._id,
      name: aTag.key
    })
  }
  return ({
    ...state,
    tagList
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
  [TagTypes.GET_TAGS]: getTags,
  [TagTypes.RESET_TO_INITIAL_STATE]: resetToInitialState


})
