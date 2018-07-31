import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk'
import rootReducer from './root-reducer'
import { connect } from 'store/app/Band/action'

const history = createBrowserHistory()

export const configureStore = async (initialState = {}) => {
  /* Stack of middlewares to apply */
  const middlewares = [thunk, routerMiddleware(history)]

  const store = createStore(
    connectRouter(history)(rootReducer),
    initialState,
    compose(applyMiddleware(...middlewares))
  )

  // Expose store for debugging
  window.store = store

  // Listening for BAND Extension Messages
  window.addEventListener(
    'message',
    function(event) {
      // We only accept messages from this window to itself [i.e. not from any iframes]
      if (event.source != window) return

      // Debug
      console.log('event => ', event.data.type)

      // Reponse to Browser's ping
      if (event.data.type && event.data.type == 'BAND_PROTOCOL_PONG') {
        store.dispatch(connect())
      }

      // if (event.data.type && event.data.type == 'BAND_PROTOCOL') {
      //   // broadcasts it to rest of extension, or could just broadcast event.data.payload...
      //   alert('MESSAGE!!!!')
      //   ext.runtime.sendMessage(event.data)
      // } // else ignore messages seemingly not sent to yourself
    },
    false
  )

  return store
}

export { history }
