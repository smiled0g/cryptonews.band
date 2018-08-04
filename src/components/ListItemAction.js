import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { connect, bindActions } from 'store'
import { sendBandProtocolTask } from 'store/app/Band/action'
import { CONTRACT_INFO } from 'config'

const VoteChoiceContainer = styled.div`
  display: inline-block;

  > *:not(:first-child) {
    margin-left: 4px;
  }
`

const Button = styled.button`
  font-size: 10px;
  border: 0;
  border-radius: 3px;
  padding: 0 4px;
  line-height: 16px;
  letter-spacing: 0.3px;
  background: ${p => {
    if (p.attention) return '#02D594'
    if (p.neutral) return '#6a3ce7'
    if (p.positive) return '#00B1FF'
    if (p.negative) return '#F56868'
    else return '#777777'
  }};
  color: #fff;
  padding: 0 5px;
  vertical-align: middle !important;
  opacity: 0.8;
  transition: all 200ms;
  cursor: pointer;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.3);

  :hover:not(:active) {
    opacity: 1;
    transform: translateY(-1px);
  }
`

const Component = ({ item, onUpdateItem }) => {
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
          <Button positive>
            <i className="icon ion-md-arrow-dropup" /> keep
          </Button>
          <Button negative>
            <i className="icon ion-md-arrow-dropdown" /> remove
          </Button>
        </VoteChoiceContainer>
      )
    }
    if (item.active_challenge.period === 1) {
      return <Link to={`/challenge/${item.id}`}>revealing votes</Link>
    }
    if (item.active_challenge.period === 2) {
      return (
        <VoteChoiceContainer>
          <Button>vote done</Button>
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

  render() {
    return (
      <Component
        item={this.props.item}
        onUpdateItem={this.onUpdateItem.bind(this)}
      />
    )
  }
}

export default connect(
  undefined,
  dispatch => bindActions({ sendBandProtocolTask }, dispatch)
)(ListItemAction)
