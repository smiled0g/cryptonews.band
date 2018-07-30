import React from 'react'
import styled from 'styled-components'

import ListItem from 'components/ListItem'

const Container = styled.main`
  width: 100%;
  max-width: 1000px;
  height: 20px;
`

export default ({}) => (
  <Container>
    <ListItem
      no="1"
      title="DEX Waves Scored a $6 Million Debut. Then It Got Hacked"
      url="www.coindesk.com"
      staking="3,500"
      poster="coindesk (+20)"
      time="2 hr"
      comments="3"
    />
  </Container>
)
