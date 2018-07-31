import React from 'react'
import styled from 'styled-components'

import LogoSrc from 'assets/logo.svg'

const Container = styled.main`
  width: 100%;
  height: 32px;
  display: flex;
  align-items: center;
  background: #e7dfff;
`

const Logo = styled.img`
  height: 29px;
  width: 29px;
  margin: 0 2px;
`

const H1 = styled.div`
  font-size: 14px;
  margin: 0 15px 0 10px;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const Searchbar = styled.div`
  border-radius: 4px;
  background: #ffffff;
  border: solid 1px #9a79f7;
  display: flex;
  position: relative;

  > i {
    position: absolute;
    color: #9a79f7;
    font-size: 18px;
    left: 7px;
    top: 1px;
  }
`

const Search = styled.input`
  display: block;
  border: 0;
  line-height: 22px;
  width: 160px;
  padding-left: 25px;
  border-radius: 4px;
`
const SearchButton = styled.button`
  dispaly: block;
  border: 0;
  border-radius: 0 4px 4px 0;
  background: #9a79f7;
  width: 28px;
  line-height: 23px;

  i {
    color: #ffffff;
  }
`

const Nav = styled.nav`
  flex: 1;
  margin: 0 15px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
const WalletStatus = styled.div`
  flex: 0 0 auto;
  margin-right: 10px;
  color: ${p => (p.connected ? '#6e3ef3' : '#f75353')};
`

export default ({ walletConnected }) => (
  <Container>
    <Logo src={LogoSrc} />
    <H1>
      <a href="/">Band Crypto News</a>
    </H1>
    <Searchbar>
      <i className="icon ion-md-search" />
      <Search />
      <SearchButton>
        <i className="icon ion-md-arrow-dropdown" />
      </SearchButton>
    </Searchbar>
    <Nav>
      <a href="/tutorial">tutorial</a> | <a href="/proposals">proposals</a> |{' '}
      <a href="/challenges">challenges</a> | <a href="/submit">submit</a>
    </Nav>
    <WalletStatus connected={walletConnected}>
      <i
        className="icon ion-md-wallet"
        style={{ marginRight: '5px', fontSize: '14px' }}
      />
      {walletConnected ? 'connected' : 'disconnected'}
    </WalletStatus>
  </Container>
)
