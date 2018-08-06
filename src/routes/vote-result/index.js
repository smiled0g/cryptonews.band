import React from 'react'
import { connect, bindActions } from 'store'
import { push } from 'connected-react-router'
import Component from './renderer'
import { CONTRACT_INFO } from 'config'
import { sendBandProtocolTask } from 'store/app/Band/action'
import { fetchItem } from 'store/app/List/action'

class Route extends React.Component {
  state = {
    choice: this.props.match.params.choice,
  }

  async componentDidMount() {
    await this.props.fetchItem(this.props.match.params.id)
  }

  onChallenge() {
    this.props.sendBandProtocolTask({
      task: 'contract_method',
      contractType: 'Registry',
      contractAddress: CONTRACT_INFO.registry_address,
      method: 'challenge',
      args: [this.props.match.params.id, this.state.reason],
    })
  }
  onKeep() {
    this.state.push()
  }

  render() {
    if (!this.props.item) return null

    console.log('X', this.props.item)

    return (
      <Component
        item={this.props.item}
        choice={this.state.choice}
        onChoiceChange={val => this.setState({ choice: val })}
        onChallenge={this.onChallenge.bind(this)}
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
