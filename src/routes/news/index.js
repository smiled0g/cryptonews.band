import React from 'react'
import { connect, bindActions } from 'store'
import { push } from 'connected-react-router'
import Component from './renderer'
import { fetchAllItems } from 'store/app/List/action'
import Fuse from 'fuse.js'

class Route extends React.Component {
  async componentDidMount() {
    await this.props.fetchAllItems()
  }

  get itemList() {
    const items = this.props.items
    const itemIds = Object.keys(items).sort(
      (a, b) => items[a].freshness - items[b].freshness
    )

    const itemList = itemIds.map(itemId => items[itemId])

    if (this.props.keyword) {
      return new Fuse(itemList, {
        keys: ['content.title', 'content.url', 'owner'],
      })
        .search(this.props.keyword)
        .filter(this.props.filter)
    }

    return itemList.filter(this.props.filter)
  }

  render() {
    return <Component list={this.itemList} />
  }
}

export default connect(
  state => ({
    items: state.app.List.get('items').toJS(),
    keyword: state.app.Search.get('keyword'),
  }),
  dispatch =>
    bindActions(
      {
        fetchAllItems,
      },
      dispatch
    )
)(Route)
