
import {legacy_createStore as createStore, combineReducers} from 'redux';
import { profile } from './reducers/profileReducer'

const rootReducer = combineReducers({
   profile,
})

const store = createStore(rootReducer)

export {store}