import styled from 'styled-components'

export const SupremeTaskBox = styled.div`
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  min-height: 33px;
  margin: 7px auto 0 auto;
  width: 92%;
  &:first-of-type {
    margin-top: 31px;
  }
`

export const MainTaskBox = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(147, 51, 234, 0.06);
  justify-content: space-between;
  margin: 7px auto 0 auto;
  font-size: 16px;
  align-items: center;
  transition: 0.1s;
  border-radius: 10px;
  display: flex;
  padding: 0;
  margin: 0;

  &:hover {
    background-color: rgba(146, 51, 234, 0.135);
    transition: 0.3s;
  }
`

export const TaskBox = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  min-width: max-content;
  min-height: 0;
  outline: none;
  border: none;
  height: 33px;
  width: 100%;
  background: transparent;
`

export const LittleBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: auto 16px auto 0px;
`

export const ButtonBox = styled.button`
  cursor: pointer;
  border: none;
  background: transparent;
  margin-left: 11px;
  display: flex;
  align-items: center;
  width: fit-content;
  margin-right: 20px;
  padding: 0;
`

export const TaskImage = styled.img`
  width: 18px;
  height: 18px;
  contain: cover;
  align-self: center;
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

export const TaskInput = styled.input`
  outline: none;
  background-color: transparent;
  border-radius: 4px;
  border: none;
  background-color: ${(props) => props.backgroundColor};
  border: ${(props) => props.border};
  border-color: rgba(146, 51, 234, 1);
  transition: 0.1s;

  &::placeholder {
    color: black;
    opacity: 1;
  }
`
