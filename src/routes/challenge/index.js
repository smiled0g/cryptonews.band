import React from 'react'
import { connect, bindActions } from 'store'
import { push } from 'connected-react-router'
import { CONTRACT_INFO } from 'config'
import { sendBandProtocolTask } from 'store/app/Band/action'
import { fetchItem } from 'store/app/List/action'

import Component from './renderer'

class Route extends React.Component {
  state = {
    reason: '',
    hasSubmitted: false,
  }

  async componentDidMount() {
    if (!this.props.item) {
      // Fetch item
      await this.props.fetchItem(this.props.match.params.id)
    }
  }

  onChallenge() {
    this.props.sendBandProtocolTask({
      task: 'contract_method',
      contractType: 'Registry',
      contractAddress: CONTRACT_INFO.registry_address,
      method: 'challenge',
      args: [this.props.match.params.id, this.state.reason],
    })

    this.setState({ hasSubmitted: true })
  }

  render() {
    const { reason, hasSubmitted } = this.state
    if (!this.props.item) return null

    return (
      <Component
        item={this.props.item}
        reason={reason}
        onReasonChange={val =>
          val.length < 500 && this.setState({ reason: val })
        }
        onChallenge={this.onChallenge.bind(this)}
        hasSubmitted={hasSubmitted}
      />
    )
  }
}

export default connect(
  (state, ownProps) => ({
    items: state.app.List.get('items'),
    item: state.app.List.get('items').get(ownProps.match.params.id),
  }),
  dispatch =>
    bindActions(
      {
        sendBandProtocolTask,
        fetchItem,
      },
      dispatch
    )
)(Route)
