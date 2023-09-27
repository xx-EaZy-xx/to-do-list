import React, { useEffect, useState, useRef } from 'react'
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
  isOpen,
  setIsOpen,
  poly,
  addTask,
  inputValue,
  handleInputChange,
  taskKey,
  deleteTask,
}) {
  const modalInput = useRef(null)

  function handleOverlayClose(e) {
    if (e.target === e.currentTarget) {
      setIsOpen(false)
    }
  }

  function handleEscClose({ key }) {
    switch (key) {
      case 'Escape':
        setIsOpen(false)
      case 'Enter':
        if (!!addTask) {
          addTask()
        }
        if (!!deleteTask) {
          deleteTask()
        }
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleEscClose)
    return () => {
      document.removeEventListener('keydown', handleEscClose)
    }
  })
  useEffect(() => {
    if (modalInput.current) {
      modalInput.current.focus()
    }
  }, [isOpen])

  return (
    <ModalBackground
      visible={isOpen}
      id="background"
      onClick={(e) => {
        handleOverlayClose(e)
      }}
    >
      <ModalContainer>
        <ModalHeader>
          {poly === 'create' ? 'Create task' : 'Delete task'}
        </ModalHeader>
        {poly === 'create' ? (
          <ModalInput
            ref={modalInput}
            value={inputValue}
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
            <ModalLittleBox
              onClick={() => {
                deleteTask(taskKey)
              }}
            >
              <ModalSigns src="trash.svg" />
              <DeleteButton>Delete</DeleteButton>
            </ModalLittleBox>
          )}
          <ModalLittleBox
            onClick={() => {
              setIsOpen()
            }}
          >
            <ModalSigns src="cross.svg" />
            <CloseButton>Close</CloseButton>
          </ModalLittleBox>
        </ModalBox>
      </ModalContainer>
    </ModalBackground>
  )
}
