import React from 'react'
import { connect, bindActions } from 'store'
import { push } from 'connected-react-router'
import Component from './renderer'
import { CONTRACT_INFO } from 'config'
import { sendBandProtocolTask } from 'store/app/Band/action'
import Base64 from 'base-64'

class Route extends React.Component {
  state = {
    title: '',
    url: '',
    tokens: '1000',
  }

  onSubmit() {
    const tokens = this.state.tokens.trim()
    const title = this.state.title.trim()
    const url = this.state.url.trim().toLowerCase()

    if (!title) {
      return alert('Title must not be empty')
    }

    if (title.length > 100) {
      return alert('Title must contain no more than 100 characters')
    }

    if (!(url.startsWith('http://') || url.startsWith('https://'))) {
      return alert('URL must starts with http:// or https://')
    }

    this.props.sendBandProtocolTask({
      task: 'contract_method',
      contractType: 'Registry',
      contractAddress: CONTRACT_INFO.registry_address,
      method: 'apply',
      args: [
        Base64.encode(
          unescape(
            encodeURIComponent(
              JSON.stringify({
                title,
                url,
              })
            )
          )
        ),
        tokens.split('.')[0] + [...Array(18).fill('0')].join(''),
      ],
    })
  }

  render() {
    const { title, url, tokens } = this.state
    return (
      <Component
        title={title}
        url={url}
        tokens={tokens}
        onTitleChange={val =>
          val.length <= 100 && this.setState({ title: val })
        }
        onURLChange={val => this.setState({ url: val })}
        onTokensChange={val => this.setState({ tokens: val })}
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
        sendBandProtocolTask,
      },
      dispatch
    )
)(Route)
