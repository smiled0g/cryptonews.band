import React from 'react'
import styled from 'styled-components'
import moment from 'moment'
import { connect, bindActions } from 'store'
import { setKeyword } from 'store/app/Search/action'
import ListItemAction from 'components/ListItemAction'

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

  > * {
    vertical-align: top;
  }
`

const Owner = styled.a`
  display: inline-block;
  max-width: 100px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-size: 12px;
  line-height: 22px;
`

const Component = ({ item, order, setKeyword }) => (
  <Container>
    <No>{order}.</No>
    <Content>
      <Links>
        <Title href={item.content.url} target="_blank">
          {item.content.title}
        </Title>
        <Url
          onClick={() =>
            setKeyword(item.content.url.split('//')[1].split('/')[0])
          }
        >
          ({item.content.url.split('//')[1].split('/')[0]})
        </Url>
      </Links>
      <SubInfo>
        <span>{`${item.deposit} BCN `} by </span>
        <Owner
          onClick={e => {
            setKeyword(item.owner)
            e.preventDefault()
          }}
        >
          {item.owner}
        </Owner>
        <span>{`${moment(item.app_expire * 1000).fromNow()} | `} </span>
        <ListItemAction item={item} />
        {/* {`${comments} comments`} */}
      </SubInfo>
    </Content>
  </Container>
)

export default connect(
  undefined,
  dispatch => bindActions({ setKeyword }, dispatch)
)(Component)
