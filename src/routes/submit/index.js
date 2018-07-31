import React from 'react'
import { connect, bindActions } from 'store'
import { push } from 'connected-react-router'
import Component from './renderer'
import { submitNewProposal } from 'store/app/Band/action'

class Route extends React.Component {
  state = {
    title: '',
    url: '',
  }

  onSubmit() {
    const title = this.state.title.trim()
    const url = this.state.url.trim().toLowerCase()

    if (!title) {
      return alert('Title must not be empty')
    }

    if (!(url.startsWith('http://') || url.startsWith('https://'))) {
      return alert('URL must starts with http:// or https://')
    }

    this.props.submitNewProposal(title, url)
  }

  render() {
    const { title, url } = this.state
    return (
      <Component
        title={title}
        url={url}
        onTitleChange={val => this.setState({ title: val })}
        onURLChange={val => this.setState({ url: val })}
        onSubmit={this.onSubmit.bind(this)}
      />
    )
  }
}

export default connect(
  state => ({
    connected: state.app.Band.get('connected'),
  }),
  dispatch =>
    bindActions(
      {
        submitNewProposal,
      },
      dispatch
    )
)(Route)
