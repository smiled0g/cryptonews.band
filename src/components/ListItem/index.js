import React from 'react'
import styled from 'styled-components'

const Container = styled.main`
  width: 100%;
  display: flex;
  margin-bottom: 8px;
`
const No = styled.div`
  width: 30px;
`
const Content = styled.div`
  flex: 1;
`
const Links = styled.span``
const Title = styled.a`
  font-size: 15px;
`
const Url = styled.a`
  font-size: 13px;
  opacity: 0.7;
  margin-left: 5px;
`
const SubInfo = styled.div`
  color: #828282;
  font-size: 12px;
  line-height: 22px;
`

export default ({ no, title, url, staking, poster, time, comments }) => (
  <Container>
    <No>{no}.</No>
    <Content>
      <Links>
        <Title>{title}</Title>
        <Url>({url})</Url>
      </Links>
      <SubInfo>
        {`${staking} BCN `}
        {`by ${poster} ${time} ago | `}
        {`${comments} comments`}
      </SubInfo>
    </Content>
  </Container>
)
