import React from 'react'
import { connect, bindActions } from 'store'
import Component from './renderer'
import { setKeyword } from 'store/app/Search/action'

class Header extends React.Component {
  state = {
    keyword: '',
  }

  componentDidUpdate(prevProps) {
    if (prevProps.keyword !== this.props.keyword && !this.deferSetKeyword) {
      this.setState({ keyword: this.props.keyword })
    }
  }

  onKeywordChange(keyword) {
    this.setState({ keyword })

    if (this.deferSetKeyword) {
      clearTimeout(this.deferSetKeyword)
      this.deferSetKeyword = null
    }

    this.deferSetKeyword = setTimeout(() => {
      this.props.setKeyword(keyword)
      this.deferSetKeyword = null
    }, 250)
  }

  render() {
    return (
      <Component
        walletConnected={this.props.walletConnected}
        onKeywordChange={this.onKeywordChange.bind(this)}
        keyword={this.state.keyword}
        path={this.props.path}
      />
    )
  }
}

export default connect(
  state => ({
    walletConnected: state.app.Band.get('connected'),
    keyword: state.app.Search.get('keyword'),
    path: state.router.location.pathname,
  }),
  dispatch => bindActions({ setKeyword }, dispatch)
)(Header)
