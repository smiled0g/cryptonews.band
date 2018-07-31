import React from 'react'
import { connect } from 'react-redux'
import Component from './renderer'

export default connect(state => ({
  walletConnected: state.app.Band.get('connected'),
}))(Component)
