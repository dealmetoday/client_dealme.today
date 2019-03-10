import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from 'App/Sagas'
import { reducer as ExampleReducer } from './Example/Reducers'
import { reducer as AuthReducer } from './Auth/Reducers'
import { reducer as UserReducer } from './User/Reducers'
import { reducer as TagReducer } from './Tags/Reducers'
import {reducer as MallReducer } from './Malls/Reducers'
import {reducer as DealsReducer} from './Deals/Reducers'
import {reducer as StoreReducer} from './Stores/Reducers'


export default () => {
  const rootReducer = combineReducers({
    /**
     * Register your reducers here.
     * @see https://redux.js.org/api-reference/combinereducers
     */
    example: ExampleReducer,
    auth: AuthReducer,
    user: UserReducer,
    tags: TagReducer,
    malls: MallReducer,
    deals: DealsReducer,
    stores: StoreReducer
  })

  return configureStore(rootReducer, rootSaga)
}
