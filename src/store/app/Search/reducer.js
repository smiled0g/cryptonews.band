import { fromJS } from 'immutable'
import { actionTypes } from './action'

const initialState = fromJS({
  keyword: '',
})

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.SET_KEYWORD:
      return state.set('keyword', payload.keyword)

    default:
      return state
  }
}
