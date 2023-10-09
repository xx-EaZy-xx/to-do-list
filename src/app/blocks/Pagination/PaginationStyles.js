import styled from 'styled-components'

export const PageContainer = styled.nav`
  display: flex;
  width: fit-content;
  max-width: 672px;
  height: 50px;
  flex-direction: row;
  justify-content: start;
  top: 30%;
  left: 70%;
  font-size: 16px;
  line-height: 16px;
  background-color: rgba(146, 51, 234, 0.1);
  border-radius: 6px;
  margin: 0;
  margin-left: auto;
  margin-right: auto;
  overflow: scroll;
  align-items: center;
  padding-top: 4px;
  transition: 0.1s;
  margin-top: 8px;
  overflow-y: hidden;

  &:hover {
    background-color: rgba(146, 51, 234, 0.2);
    transition: 0.1s;
  }
`

export const PageButton = styled.button`
  height: 100%;
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 0 10px 10px 8px;
  align-items: center;
  display: flex;
  text-decoration: underline;
  transition: 0.1s;
  color: ${(props) => (props.active ? 'white' : 'black')};

  &:hover {
    transition: 0.1s;
    color: rgba(255, 255, 255, 0.8);
  }
`
