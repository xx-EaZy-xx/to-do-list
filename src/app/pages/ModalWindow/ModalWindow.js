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
  const [valError, setValError] = useState('')
  const modalInput = useRef(null)
  const trashButton = useRef(null)
  const invalidMessage = {
    emptiness: 'Empty space is not a valid task name!',
    sameness: 'Task with this name already exists!',
  }
  //Создание новой таски
  async function addNewTask(name) {
    try {
      if (inputValue.trim() !== '') {
        const error = await Api.postTask({ name })
        const errorStatus = +error.message?.slice(-3) ?? ''
        setValError(errorStatus)
        console.log(valError)
        handleFetch()
        if (errorStatus === 409) {
          setPlaceHolder(invalidMessage.sameness)
        }
      }
    } catch (err) {
      console.log(err)
    }
  }

  function handleInputChange(e) {
    setInputValue(e.target.value)
  }

  //Валидация единственного инпута
  function handleValidation(arg) {
    setPlaceHolder(arg)
    return
  }
  //Клавиатурные действия
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
      if (!!addNewTask) {
        addNewTask(inputValue.trim())
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
                invalid={valError === 409 ? true : false}
                ref={modalInput}
                value={inputValue}
                onChange={(e) => {
                  handleInputChange(e)
                }}
                onKeyDown={(e) => {
                  inputValue.trim() === ''
                    ? handleValidation(invalidMessage.emptiness)
                    : handleKeyPress(e)
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
                    addNewTask(inputValue.trim())
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
