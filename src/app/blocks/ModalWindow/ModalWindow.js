import React, { useState, useEffect } from 'react'
import {
  ModalBackground,
  ModalContainer,
  CloseButton,
  SaveButton,
  DeleteButton,
  ModalHeader,
  ModalBox,
  ModalLittleBox,
  ModalSigns,
  ModalInput,
  ModalMessage,
} from './ModalWindowStyles'

export default function ModalWindow({
  $isOpen,
  isToggled,
  overlayClick,
  onEscPress,
  poly,
  addTask,
  inputValue,
  handleInputChange,
}) {
  useEffect(() => {
    document.addEventListener('keydown', onEscPress)
    return () => document.removeEventListener('keydown', onEscPress)
  })

  return (
    <ModalBackground
      visible={!!$isOpen}
      id="background"
      onMouseDown={overlayClick}
    >
      <ModalContainer>
        <ModalHeader>
          {poly === 'create' ? 'Create task' : 'Delete task'}
        </ModalHeader>
        {poly === 'create' ? (
          <ModalInput
            onChange={(e) => {
              handleInputChange(e)
            }}
            placeholder="Enter text..."
          />
        ) : (
          <ModalMessage>Are you sure about deleting this task?</ModalMessage>
        )}
        <ModalBox>
          {poly === 'create' ? (
            <ModalLittleBox
              onClick={() => {
                addTask(inputValue)
              }}
            >
              <ModalSigns src="doneGreen.svg" />
              <SaveButton>Save</SaveButton>
            </ModalLittleBox>
          ) : (
            <ModalLittleBox>
              <ModalSigns src="trash.svg" />
              <DeleteButton>Delete</DeleteButton>
            </ModalLittleBox>
          )}
          <ModalLittleBox onClick={isToggled}>
            <ModalSigns src="cross.svg" />
            <CloseButton>Close</CloseButton>
          </ModalLittleBox>
        </ModalBox>
      </ModalContainer>
    </ModalBackground>
  )
}
