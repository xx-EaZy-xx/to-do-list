'use client'
import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Api } from '@/app/utils/MainApi'
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
} from './ModalWindow.styled'

export default function ModalWindow({
  isOpen,
  setIsOpen,
  poly,
  deleteTask,
  taskId,
  handleFetch,
}) {
  const [placeholder, setPlaceHolder] = useState('Enter text...')
  const [inputValue, setInputValue] = useState('')
  const modalInput = useRef(null)
  const trashButton = useRef(null)
  //Создание новой таски
  async function addNewTask(name) {
    try {
      await Api.postTask({ name }).then(() => handleFetch())
    } catch (err) {
      console.log(err)
    }
  }
  function insertInputValue() {
    if (inputValue.trim() !== '') {
      addNewTask(inputValue)
      setIsOpen(false)
    }
  }
  function handleInputChange(e) {
    setInputValue(e.target.value)
  }
  //Создание новой таски

  function handleValidation(arg) {
    setInputValue('')
    setPlaceHolder(arg)
    return
  }

  function handleOverlayClose(e) {
    e.target === e.currentTarget ? setIsOpen(false) : ''
  }
  function handleKeyPress(e) {
    if (e.key === 'Enter' && !!deleteTask) {
      deleteTask()
      setIsOpen(false)
    }
    if (e.key === 'Escape' && !!deleteTask) {
      setIsOpen(false)
    }
    if (e.key === 'Escape' && modalInput.current) {
      setInputValue('')
    }
    if (e.key === 'Enter' && modalInput.current) {
      if (!!insertInputValue) {
        insertInputValue()
      }
    }
  }

  useEffect(() => {
    setInputValue('')
    if (modalInput.current) {
      modalInput.current.focus()
    }
    if (trashButton.current) {
      trashButton.current.focus()
    }
  }, [isOpen, setIsOpen])

  return isOpen
    ? createPortal(
        <ModalBackground
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
              <ModalMessage>
                Are you sure about deleting this task?
              </ModalMessage>
            )}
            <ModalBox>
              {poly === 'create' ? (
                <ModalLittleBox
                  onClick={() => {
                    insertInputValue(inputValue)
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
        </ModalBackground>,
        document.body
      )
    : null
}

// <Wrapper>
// <div></div>
// </Wrapper>

// const Wrapper =() => (
//   <Wrapper>
//     {children}
//   </Wrapper>
// )
