import React from 'react'
import styled from 'styled-components'

const Button = styled.button`
  font-size: 10px;
  border: 0;
  border-radius: 3px;
  padding: 0 4px;
  line-height: 16px;
  letter-spacing: 0.3px;
  background: ${p => {
    if (p.attention) return '#02D594'
    if (p.neutral) return '#6a3ce7'
    if (p.positive) return '#00B1FF'
    if (p.negative) return '#F56868'
    else return '#777777'
  }};
  color: #fff;
  padding: 0 5px;
  vertical-align: middle !important;
  opacity: 0.8;
  transition: all 200ms;
  cursor: pointer;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.3);

  :hover:not(:active) {
    opacity: 1;
    transform: translateY(-1px);
  }
`

export default Button
