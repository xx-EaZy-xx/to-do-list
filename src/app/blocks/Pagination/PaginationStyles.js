import styled from 'styled-components'

export const PageContainer = styled.div`
  display: flex;
  max-width: 60px;
  min-width: fit-content;
  height: 18px;
  flex-direction: row;
  justify-content: space-between;
  top: 30%;
  left: 70%;
  right: auto;
  font-size: 16px;
  line-height: 16px;
  background-color: rgba(147, 51, 234, 0.3);
  border-radius: 6px;
`

export const PageButton = styled.button`
  height: 10px;
  width: 10px;
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 0 8px;
  text-align: center;
  display: flex;
  justify-content: center;
  text-decoration: underline;
`
