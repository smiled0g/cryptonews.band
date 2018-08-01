import { fromJS } from 'immutable'
import { actionTypes } from './action'

const initialState = fromJS({
  connected: false,
})

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.CONNECT:
      return state.set('connected', true)

    case actionTypes.DISCONNECT:
      return state.set('connected', false)

    default:
      return state
  }
}
