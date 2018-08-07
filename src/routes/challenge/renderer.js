import React from 'react'
import styled from 'styled-components'
import moment from 'moment'

import {
  Field,
  Input,
  TextArea,
  Label,
  Header,
  Button,
  InfoPanel,
  PleaseOpenWallet,
} from 'components/Form'

const Container = styled.article`
  width: 100%;
  max-width: 1000px;
`

export default ({
  item,
  reason,
  hasSubmitted,
  onReasonChange,
  onChallenge,
}) => (
  <Container>
    <Header>Challenge a listed entry</Header>
    <Field>
      <Label>Title:</Label>
      <TextArea value={item.content.title} rows={2} disabled />
    </Field>
    <Field>
      <Label>URL:</Label>
      <TextArea value={item.content.url} rows={2} disabled />
    </Field>
    <Field>
      <Label>Listed:</Label>
      <Input value={moment(item.app_expire * 1000).fromNow()} disabled />
    </Field>
    <Field>
      <Label>Reason:</Label>
      <TextArea
        value={reason}
        rows={3}
        onChange={e => onReasonChange(e.target.value)}
        placeholder="Why this entry should be delisted?"
      />
    </Field>
    <Field>
      <Label>
        <i className="icon ion-md-help-circle-outline" />
      </Label>
      <InfoPanel>
        You need 1000 BCN tokens in order to challenge this listing. Once you
        submitted, other community members will vote whether they agree or not.{' '}
        <a href="/tutorial" target="_blank">
          Learn more.
        </a>
      </InfoPanel>
    </Field>
    <Field>
      <Label />
      {hasSubmitted ? (
        <PleaseOpenWallet />
      ) : (
        <Button onClick={onChallenge}>Challenge</Button>
      )}
    </Field>
  </Container>
)
