import React, { useEffect, useRef, useState } from 'react'
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
  setInputValue,
  handleInputChange,
  deleteTask,
  taskId,
}) {
  const [placeholder, setPlaceHolder] = useState('Enter text...')
  const modalInput = useRef(null)
  const trashButton = useRef(null)

  function handleValidation(arg) {
    setInputValue('')
    setPlaceHolder(arg)
    return
  }

  function handleOverlayClose(e) {
    if (e.target === e.currentTarget) {
      setIsOpen(false)
    }
  }
  function handleKeyPress(e) {
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
              if (inputValue.trim() === '') {
                handleValidation('Empty space is not a valid task name')
              } else {
                handleKeyPress(e)
              }
            }}
            placeholder={placeholder}
          />
        ) : (
          <ModalMessage>Are you sure about deleting this task?</ModalMessage>
        )}
        <ModalBox>
          {poly === 'create' ? (
            <ModalLittleBox
              onClick={() => {
                addTask(inputValue)
                if (inputValue.trim() === '') {
                  handleValidation('Empty space is not a valid task name')
                }
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
                handleKeyPress(e)
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

// <Wrapper>
// <div></div>
// </Wrapper>

// const Wrapper =() => (
//   <Wrapper>
//     {children}
//   </Wrapper>
// )
