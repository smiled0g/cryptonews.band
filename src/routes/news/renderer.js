import React from 'react'
import styled from 'styled-components'

import ListItem from 'components/ListItem'

const Container = styled.main`
  width: 100%;
  max-width: 1000px;
`

export default ({ list }) => (
  <Container>
    {list.map((item, order) => (
      <ListItem key={item.id} order={order + 1} item={item} />
    ))}
  </Container>
)
