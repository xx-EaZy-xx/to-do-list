import React, { useEffect, useRef } from 'react'
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
  deleteTask,
  taskId,
}) {
  const modalInput = useRef(null)
  const trashButton = useRef(null)

  function handleOverlayClose(e) {
    if (e.target === e.currentTarget) {
      setIsOpen(false)
    }
  }
  function handleEscClose(e) {
    if (e.key === 'Enter' && !!deleteTask) {
      deleteTask()
      setIsOpen(false)
      return
    }
    if (e.key === 'Escape' && !!deleteTask) {
      setIsOpen(false)
      return
    }
    if (e.key === 'Escape' && modalInput.current) {
      modalInput.current.value = ''
      return
    }
    if (e.key === 'Enter' && modalInput.current) {
      if (!!addTask) {
        addTask()
      }
    }
  }

  useEffect(() => {
    if (modalInput.current) {
      modalInput.current.focus()
    }
    if (trashButton.current) {
      trashButton.current.focus()
    }
  }, [isOpen, setIsOpen])

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
            onKeyDown={(e) => {
              handleEscClose(e)
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
              ref={trashButton}
              onClick={() => {
                deleteTask(taskId)
              }}
              onKeyDown={(e) => {
                handleEscClose(e)
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
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                setIsOpen()
              }
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
