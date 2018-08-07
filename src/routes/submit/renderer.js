import React from 'react'
import styled from 'styled-components'

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
  title,
  url,
  tokens,
  hasSubmitted,
  onTitleChange,
  onURLChange,
  onTokensChange,
  onSubmit,
}) => (
  <Container>
    <Header>Submit a new entry</Header>
    <Field>
      <Label>Title:</Label>
      <TextArea
        placeholder="Brief title for your entry (100 chars max)"
        row={2}
        value={title}
        onChange={e => onTitleChange(e.target.value)}
      />
    </Field>
    <Field>
      <Label>URL:</Label>
      <TextArea
        placeholder="Must begin with http:// or https://"
        row={2}
        value={url}
        onChange={e => onURLChange(e.target.value)}
      />
    </Field>
    <Field>
      <Label>BCN:</Label>
      <Input value={tokens} onChange={e => onTokensChange(e.target.value)} />
    </Field>
    <Field>
      <Label>
        <i className="icon ion-md-help-circle-outline" />
      </Label>
      <InfoPanel>
        You need at least 1000 BCN tokens in order to propose a new link. Your
        listing may be challenged, and you may lost all your fund during the
        challenge process. <a href="/tutorial">Learn more.</a>
      </InfoPanel>
    </Field>
    <Field>
      <Label />
      {hasSubmitted ? (
        <PleaseOpenWallet />
      ) : (
        <Button onClick={onSubmit}>Submit</Button>
      )}
    </Field>
  </Container>
)
