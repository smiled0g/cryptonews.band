import { fromJS } from 'immutable'
import { actionTypes } from './action'

const initialState = fromJS({
  items: {},
})

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.UPDATE_ITEM:
      return state.updateIn(['items', payload.id], (item = {}) =>
        Object.assign(item, payload.item)
      )

    default:
      return state
  }
}
