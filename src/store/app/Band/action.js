import { createScopedActionTypes } from 'store/utils'

export const actionTypes = createScopedActionTypes('app.Band', [
  'CONNECT',
  'DISCONNECT',
])

export const pingBandExtension = () => async (dispatch, getStore) => {
  // Ping to BAND extension
  window.postMessage({ type: 'BAND_PROTOCOL_PING' }, '*')
}

export const connect = () => ({
  type: actionTypes.CONNECT,
})

export const sendBandProtocolTask = param => async (dispatch, getStore) => {
  try {
    window.postMessage({ type: 'BAND_PROTOCOL', op: 'task', param: param }, '*')
  } catch (e) {
    console.log('Error', e)
  }
}
