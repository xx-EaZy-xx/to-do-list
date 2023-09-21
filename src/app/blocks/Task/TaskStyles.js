import styled from 'styled-components'

export const TaskBox = styled.div`
  min-width: 466px;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  min-width: max-content;
  background-color: rgba(147, 51, 234, 0.06);
  border-radius: 10px;
  max-width: 428px;
  min-height: 0;
  height: 33px;
  margin: 0 auto 7px auto;
  font-size: 16px;
  align-items: center;
  transition: 0.3s;

  &:first-of-type {
    margin-top: 31px;
  }

  &:hover {
    background-color: rgba(146, 51, 234, 0.135);
    transition: 0.3s;
  }
`

export const LittleBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: auto 16px;
`

export const ButtonBox = styled.button`
  cursor: pointer;
  border: none;
  background: transparent;
`

export const TaskImage = styled.img`
  width: 18px;
  height: 18px;
  contain: cover;
  align-self: center;
  margin-right: 20px;
  transition: 0.1s;

  &:hover {
    opacity: 0.6;
    transition: 0.1s;
    transform: scale(1.1);
  }

  &:active {
    transform: scale(1.3);
    transition: 0.1s;
    opacity: 1;
  }
`

export const TaskImageLeft = styled.img`
  margin-right: 0;
  margin-left: 4px;
  cursor: pointer;

  &:hover {
    opacity: 0.6;
    transition: 0.3s;
    transform: scale(1.1);
  }
`

export const LittleBoxLeft = styled(LittleBox)`
  color: rgb(107, 114, 128);
  font-size: 14px;
`
