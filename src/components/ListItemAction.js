import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { connect, bindActions } from 'store'
import { sendBandProtocolTask } from 'store/app/Band/action'
import { push } from 'connected-react-router'
import { CONTRACT_INFO } from 'config'
import Button from 'components/Button'

const VoteChoiceContainer = styled.div`
  display: inline-block;

  > *:not(:first-child) {
    margin-left: 4px;
  }

  > a {
    vertical-align: middle;
  }
`

const Component = ({ item, onUpdateItem, onVote }) => {
  if (item.need_update) {
    return (
      <Button neutral onClick={onUpdateItem}>
        <i className="icon ion-md-warning" /> update needed
      </Button>
    )
  }
  if (!item.active_challenge) {
    return <Link to={`/challenge/${item.id}`}>challenge</Link>
  } else {
    if (item.active_challenge.period === 0) {
      return (
        <VoteChoiceContainer>
          <Button positive onClick={() => onVote(true)}>
            <i className="icon ion-md-arrow-dropup" /> keep
          </Button>
          <Button negative onClick={() => onVote(false)}>
            <i className="icon ion-md-arrow-dropdown" /> remove
          </Button>
        </VoteChoiceContainer>
      )
    }
    if (item.active_challenge.period === 1) {
      return <Link to={`/vote-result/${item.id}`}>revealing votes</Link>
    }
    if (item.active_challenge.period === 2) {
      return (
        <VoteChoiceContainer>
          <Link to={`/vote-result/${item.id}`}>
            <Button>vote done</Button>
          </Link>
          <Link to={`/challenge/${item.id}`}>challenge</Link>
        </VoteChoiceContainer>
      )
    }
  }
}

class ListItemAction extends React.Component {
  onUpdateItem() {
    this.props.sendBandProtocolTask({
      task: 'contract_method',
      contractType: 'Registry',
      contractAddress: CONTRACT_INFO.registry_address,
      method: 'update_status',
      args: [this.props.item.id],
    })
  }

  onVote(shouldKeep) {
    this.props.push(
      `/vote/${this.props.item.id}/${shouldKeep ? 'keep' : 'remove'}`
    )
  }

  render() {
    return (
      <Component
        item={this.props.item}
        onUpdateItem={this.onUpdateItem.bind(this)}
        onVote={this.onVote.bind(this)}
      />
    )
  }
}

export default connect(
  undefined,
  dispatch => bindActions({ sendBandProtocolTask, push }, dispatch)
)(ListItemAction)
