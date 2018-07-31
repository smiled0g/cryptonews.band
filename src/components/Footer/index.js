import React from 'react'
import styled from 'styled-components'

import LogoSrc from 'assets/logo.svg'

const Container = styled.main`
  width: 100%;
  height: 38px;
  align-items: center;
  line-height: 36px;
  border-top: solid 2px #9a79f7;
  text-align: center;
`
const Nav = styled.nav`
  flex: 1;
  margin: 0 15px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 13px;
`

export default ({}) => (
  <Container>
    <Nav>
      <a href="/guideline">Guideline</a> | <a href="/bcn-tokens">BCN Tokens</a>{' '}
      | <a href="/faq">FAQ</a> | <a href="/source-code">Source Code</a> |{' '}
      <a href="/contact">Contact</a>
    </Nav>
  </Container>
)
