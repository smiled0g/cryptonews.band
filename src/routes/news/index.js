import React from 'react'
import { connect, bindActions } from 'store'
import { push } from 'connected-react-router'
import Component from './renderer'

class Route extends React.Component {
  componentDidMount() {
    // if (this.props.vault) this.props.goToWallet()
    // else this.props.goToVaultPassword()
  }

  render() {
    return <Component />
  }
}

export default connect(
  state => ({
    vault: state.app.Vault.get('vault'),
  }),
  dispatch =>
    bindActions(
      {
        goToVaultPassword: () => push('/vault-password'),
        goToWallet: () => push('/wallet'),
      },
      dispatch
    )
)(Route)
