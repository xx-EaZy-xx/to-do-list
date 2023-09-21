import styled from 'styled-components'

export const EditBox = styled.div`
  border: 1px solid rgba(125, 64, 255, 1);
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  min-width: 53px;
  max-width: 53px;
  height: 24px;
  margin: 0 22px 14px auto;

  &:nth-last-of-type(1) {
    margin-bottom: 0;
  }
`
export const EditImage = styled.img`
  width: 18px;
  height: 15px;
  cursor: pointer;
  transition: 0.1s;

  &:hover {
    transition: 0.1s;
    opacity: 0.6;
    transform: scale(1.2);
  }

  &:active {
    opacity: 1;
  }
`
export const EditButtonBox = styled.button`
  border: none;
  background: transparent;
  display: flex;
  outline: none;
`
