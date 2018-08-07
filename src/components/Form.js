import React from 'react'
import styled from 'styled-components'

export const Input = styled.input`
  padding: 4px 6px;
  width: 100%;
  max-width: 400px;
  border-radius: 4px;
  background: #ffffff;
  border: solid 1px #9a79f7;

  &[disabled] {
    background: #f1ecff;
  }
`

export const TextArea = styled.textarea`
  padding: 4px 6px;
  width: 100%;
  max-width: 400px;
  border-radius: 4px;
  background: #ffffff;
  border: solid 1px #9a79f7;

  &[disabled] {
    background: #f1ecff;
  }
`

export const Label = styled.div`
  flex: 0 0 60px;
  text-align: right;
  margin-right: 10px;
  font-size: 13px;
  font-weight: bold;
  line-height: 24px;
`

export const Field = styled.div`
  display: flex;
  margin: 5px 0;

  i {
    font-size: 1.5em;
  }
`

export const Header = styled.div`
  font-weight: bold;
  font-size: 17px;
  padding-left: 70px;
  margin-top: 10px;
  margin-bottom: 15px;
`

export const Button = styled.button`
  padding: 5px 10px;
  background: #9a79f7;
  border-radius: 5px;
  border: 0;
  margin: 10px 10px 10px 0;
  color: #ffffff;
  font-weight: bold;
  cursor: pointer;
  transition: all 200ms;
  font-size: 14px;
  letter-spacing: 0.5px;

  :hover {
    background: #662fff;
  }
`

export const InfoPanel = styled.div`
  color: #777777;
  padding: 3px 0;
  max-width: 450px;

  a {
    text-decoration: underline;
  }
`

export const NoticePanel = styled(InfoPanel)`
  border-radius: 4px;
  border: solid 1px #9a79f7;
  padding: 3px 8px;
  background: #ffffff;
  color: #333333;
`

export const PleaseOpenWallet = () => (
  <NoticePanel>
    {'Please approve transaction from your wallet.'}
    <br />
    {'Use <Ctrl/Cmd + Space> for quick access.'}
  </NoticePanel>
)
