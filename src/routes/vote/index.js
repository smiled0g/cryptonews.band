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
    hasSubmitted: false,
  }

  async componentDidMount() {
    await this.props.fetchItem(this.props.match.params.id)
  }

  onSubmitVote() {
    this.props.sendBandProtocolTask({
      task: 'contract_method',
      contractType: 'Voting',
      contractAddress: CONTRACT_INFO.voting_address,
      method: 'commit_vote',
      args: [this.props.item.active_challenge.poll_id, this.state.reason],
      extra: { nonce: 999999, choice: this.state.choice === 'keep' ? 1 : 0 },
    })

    this.setState({ hasSubmitted: true })
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
        onSubmitVote={this.onSubmitVote.bind(this)}
        hasSubmitted={this.state.hasSubmitted}
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
