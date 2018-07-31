/**
 * Combined reducer for app state namespace
 */

import { combineReducers } from 'redux'
import Band from './Band/reducer'
import Vault from './Vault/reducer'

export default combineReducers({
  Band,
  Vault,

  // ^^^ Add more reducers here
})
