import { createScopedActionTypes } from 'store/utils'
import { EXTENSION_ID } from 'config'

export const actionTypes = createScopedActionTypes('app.Vault', [
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

export const submitNewProposal = (title, link) => async (
  dispatch,
  getStore
) => {
  console.log('submitNewProposal:', title, link)

  try {
    window.postMessage(
      { type: 'BAND_PROTOCOL', text: 'Hello from the webpage!' },
      '*'
    )
  } catch (e) {
    console.log('Error', e)
  }
}
