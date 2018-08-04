import { createScopedActionTypes } from 'store/utils'

export const actionTypes = createScopedActionTypes('app.Search', [
  'SET_KEYWORD',
])

export const setKeyword = keyword => ({
  type: actionTypes.SET_KEYWORD,
  payload: { keyword },
})
