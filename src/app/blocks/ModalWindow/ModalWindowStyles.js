import styled from 'styled-components'

export const ModalBackground = styled.div`
  background-color: rgba(65, 59, 61, 0.6);
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0px;
  left: 0px;
  visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
  transition: 0;
  z-index: 2;
`

export const ModalContainer = styled.div`
  min-width: 466px;
  max-width: fit-content;
  min-height: 181px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  background-color: white;
  font-size: 20px;
  border-radius: 10px;
  margin: auto;
  margin-top: 30vh;
`

export const CloseButton = styled.div`
  border: none;
  color: rgba(107, 114, 128, 1);
  cursor: pointer;
  border-radius: 5px;
  background-color: transparent;
  font-size: 16px;
  margin-left: 8px;
`

export const SaveButton = styled.div`
  border: none;
  cursor: pointer;
  border-radius: 5px;
  color: rgba(103, 184, 203, 1);
  background-color: transparent;
  font-size: 16px;
  margin-left: 8px;
`

export const DeleteButton = styled(SaveButton)`
  color: rgba(245, 100, 151, 1);
`

export const ModalHeader = styled.div`
  background-color: rgba(147, 51, 234, 0.06);
  width: 100%;
  font-weight: bold;
  color: rgba(147, 51, 234, 1);
  padding-left: 44px;
  padding-bottom: 11px;
  padding-top: 14px;
`

export const ModalBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  min-width: 391px;
  margin-bottom: 17px;
`

export const ModalLittleBox = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 185px;
  height: 40px;
  background-color: rgba(236, 236, 236, 0.5);
  border-radius: 5px;
  justify-content: center;
  transition: 0s;
  cursor: pointer;
  outline: none;
  border: none;
  align-items: center;
  margin-top: 24px;

  &:hover {
    transition: 0s;
    background-color: rgba(138, 138, 138, 0.3);
  }

  &:active {
    background-color: rgba(138, 138, 138, 0.6);
    transition: 0s;
  }
`

export const ModalSigns = styled.img`
  width: 20px;
  height: 20px;
  align-self: center;
`

export const ModalInput = styled.input`
  width: 388px;
  background-color: rgba(236, 236, 236, 0.5);
  border: 1px rgba(108, 122, 137, 0.2) solid;
  outline: none;
  border-radius: 10px;
  padding-left: 16px;
  font-size: 16px;

  &:focus {
    border: 1px lightskyblue solid;
  }
`
export const ModalMessage = styled.h3`
  width: 100%;
  font-weight: bold;
  color: rgba(147, 51, 234, 1);
  margin-left: 35px;
  font-size: 20px;
`
