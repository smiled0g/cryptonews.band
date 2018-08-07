import React from 'react'
import styled from 'styled-components'
import moment from 'moment'

import { Field, Input, TextArea, Label, Header, Button } from 'components/Form'

const Container = styled.article`
  width: 100%;
  max-width: 1000px;
`

const FuncDescription = styled.div`
  color: #777777;
  padding: 3px 0;
  max-width: 450px;

  a {
    text-decoration: underline;
  }
`

const ColorButton = styled.button`
  font-size: 13px;
  border: 0;
  border-radius: 5px;
  padding: 0 4px;
  line-height: 24px;
  padding: 0 10px;
  letter-spacing: 0.3px;
  background: ${p => {
    if (p.attention) return '#02D594'
    if (p.neutral) return '#6a3ce7'
    if (p.positive) return '#00B1FF'
    if (p.negative) return '#F56868'
    else return '#777777'
  }};
  color: #fff;
  vertical-align: middle !important;
  opacity: 0.8;
  transition: all 200ms;
  cursor: pointer;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  margin-right: 5px;

  i {
    margin-right: 5px;
  }

  :hover:not(:active) {
    opacity: 1;
    transform: translateY(-1px);
  }
`

const ButtonContainer = styled.div``

export default ({
  item,
  choice,
  vote,
  onChoiceChange,
  onSubmitVote,
  hasSubmitted,
}) => (
  <Container>
    <Header>Vote on the challenge</Header>
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
      <Label>Choice:</Label>
      <ButtonContainer>
        <ColorButton
          size={24}
          positive={choice === 'keep'}
          onClick={() => onChoiceChange('keep')}
        >
          <i className="icon ion-md-arrow-dropup" /> Keep Item
        </ColorButton>
        <ColorButton
          size={24}
          negative={choice === 'remove'}
          onClick={() => onChoiceChange('remove')}
        >
          <i className="icon ion-md-arrow-dropdown" /> Reject Item
        </ColorButton>
      </ButtonContainer>
    </Field>
    <Field>
      <Label>
        <i className="icon ion-md-help-circle-outline" />
      </Label>
      <FuncDescription>
        You need to request for voting power before submitting the vote.
        <a href="/tutorial" target="_blank">
          Learn more.
        </a>
      </FuncDescription>
    </Field>
    <Field>
      <Label />
      {hasSubmitted ? (
        <PleaseOpenWallet />
      ) : (
        <Button onClick={onSubmitVote}>Submit Vote</Button>
      )}
    </Field>
  </Container>
)
