import React from 'react'
import styled from 'styled-components'

import { Field, Input, TextArea, Label, Header, Button } from 'components/Form'

const Container = styled.article`
  width: 100%;
  max-width: 1000px;
`

const FuncDescription = styled.div`
  color: #777777;
  a {
    text-decoration: underline;
  }
`

export default ({ title, url, onTitleChange, onURLChange, onSubmit }) => (
  <Container>
    <Header>Submit a new link</Header>
    <Field>
      <Label>Title:</Label>
      <Input value={title} onChange={e => onTitleChange(e.target.value)} />
    </Field>
    <Field>
      <Label>URL:</Label>
      <Input value={url} onChange={e => onURLChange(e.target.value)} />
    </Field>
    <Field>
      <Label>Fund:</Label>
      <FuncDescription>
        You need at least 300 BCN tokens in order to propose a new link. Your
        listing may be challenged, and you may lost all your fund during the
        challenge process. <a href="/tutorial">Learn more.</a>
      </FuncDescription>
    </Field>
    <Field>
      <Label />
      <Button onClick={onSubmit}>Submit</Button>
    </Field>
  </Container>
)
