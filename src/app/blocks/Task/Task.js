import React, { useState, useEffect, useRef } from 'react'
import { Api } from '../../utils/MainApi'
import {
  SupremeTaskBox,
  MainTaskBox,
  TaskBox,
  ButtonBox,
  TaskImage,
  TaskImageLeft,
  LittleBox,
  LittleBoxLeft,
  TaskInput,
} from './TaskStyles'
import TaskEdition from '../TaskEdition/TaskEdition'

export default function Task({
  taskKey,
  taskTag,
  taskDate,
  partialDate,
  deleteTask,
  returnDeleteModal,
  modalDeleteIsOpen,
  setModalDeleteIsOpen,
  done,
  handleFetch,
}) {
  const [taskStatus, setTaskStatus] = useState(done)
  const [arePointsPushed, setArePointsPushed] = useState(false)
  const [inputIsFocused, setInputIsFocused] = useState(false)
  const [inputValue, setInputValue] = useState('')

  const inputRef = useRef(null)

  function handleInputChange(e) {
    setInputValue(e.target.value)
  }
  function handlePush(state, setState) {
    setState(!state)
  }

  function handleInputFocus() {
    if (inputIsFocused === false) {
      inputRef.current.focus()
      setInputIsFocused(true)
    } else {
      inputRef.current.blur()
      setInputIsFocused(false)
      Api.updateTask({ taskName: inputValue, taskId: taskKey })
      handleFetch()
    }
  }

  function handleKeyPress({ key }) {
    if (key === 'Escape') {
      inputRef.current.blur()
      setInputIsFocused(false)
      return
    }
    if (key === 'Enter') {
      inputRef.current.blur()
      setInputIsFocused(false)
      return
    }
  }

  function handleTaskDate() {
    const year = taskDate.slice(6, 10)
    const month = `${taskDate.slice(3, 5) - 1}` //Проёб с нулями??? - Вроде нет!
    const day = taskDate.slice(1, 2)
    const minutes = taskDate.slice(12, 17).replaceAll('.', ':')
    const dayOfTheWeek = new Date(year, month, day).getDay()
    function getDayOfTheWeek(day) {
      if (day === new Date().getDay()) {
        return 'Today'
      } else if (day === 0) {
        return 'Sunday'
      } else if (day === 1) {
        return 'Monday'
      } else if (day === 2) {
        return 'Tuesday'
      } else if (day === 3) {
        return 'Wednesday'
      } else if (day === 4) {
        return 'Thursday'
      } else if (day === 5) {
        return 'Friday'
      } else if (day === 6) {
        return 'Saturday'
      }
    }
    return `${getDayOfTheWeek(dayOfTheWeek)} at ${minutes}`
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  })

  useEffect(() => {
    setInputValue(taskTag)
  }, [])

  return (
    <>
      <SupremeTaskBox>
        <MainTaskBox>
          <ButtonBox>
            <TaskImage
              onClick={() => {
                handlePush(taskStatus, setTaskStatus)
                Api.updateTask({ taskId: taskKey })
                handleFetch()
              }}
              src={taskStatus ? 'done.svg' : 'doneGrey.svg'}
              alt="кнопка завершить задачу - галочка"
            ></TaskImage>
          </ButtonBox>
          <TaskBox>
            <LittleBox>
              <TaskInput
                type="text"
                ref={inputRef}
                value={inputValue}
                backgroundColor={inputIsFocused ? 'white' : 'transparent'}
                border={inputIsFocused ? '1px solid blue' : 'none'}
                onFocus={(e) => {
                  handleInputFocus(e)
                }}
                onBlur={(e) => {
                  handleInputFocus(e)
                }}
                onChange={(e) => {
                  handleInputChange(e)
                }}
              ></TaskInput>
            </LittleBox>
            <LittleBoxLeft>
              {handleTaskDate()}
              <ButtonBox
                onClick={() => {
                  handlePush(arePointsPushed, setArePointsPushed)
                }}
              >
                <TaskImageLeft
                  src="points.svg"
                  alt="кнопка ещё - 3 точки"
                ></TaskImageLeft>
              </ButtonBox>
            </LittleBoxLeft>
          </TaskBox>
        </MainTaskBox>
        {arePointsPushed ? (
          <TaskEdition
            focusInput={handleInputFocus}
            deleteTask={deleteTask}
            returnDeleteModal={returnDeleteModal(taskKey)}
            modalDeleteIsOpen={modalDeleteIsOpen}
            setModalDeleteIsOpen={setModalDeleteIsOpen}
          />
        ) : (
          ''
        )}
      </SupremeTaskBox>
    </>
  )
}
