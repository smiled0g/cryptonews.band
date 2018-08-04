/**
 * Combined reducer for app state namespace
 */

import { combineReducers } from 'redux'
import Band from './Band/reducer'
import List from './List/reducer'
import Search from './Search/reducer'

export default combineReducers({
  Band,
  List,
  Search,

  // ^^^ Add more reducers here
})
