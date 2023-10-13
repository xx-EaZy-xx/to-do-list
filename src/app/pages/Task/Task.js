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
} from './Task.styled'
import TaskEdition from '../TaskEdition/TaskEdition'

export default function Task({
  task,
  deleteTask,
  returnDeleteModal,
  modalDeleteIsOpen,
  setModalDeleteIsOpen,
  handleFetch,
}) {
  const [taskStatus, setTaskStatus] = useState(task.isDone)
  const [arePointsPushed, setArePointsPushed] = useState(false)
  const [inputIsFocused, setInputIsFocused] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [placeholder, setPlaceholder] = useState('')
  const inputRef = useRef(null)
  function handleValidation(arg) {
    setPlaceholder(arg)
    return
  }
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
    }
    if (inputIsFocused === true) {
      inputRef.current.blur()
      setInputIsFocused(false)
      Api.updateTask({ taskName: inputValue, taskId: task.id }).then(() =>
        handleFetch()
      )
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
    const year = task.date.slice(6, 10)
    const month = `${task.date.slice(3, 5)}`
    const day = task.date.slice(1, 2)
    const minutes = task.date.slice(12, 17).replaceAll('.', ':')
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
    return `${getDayOfTheWeek(dayOfTheWeek)} on ${task.date
      .slice(0, 10)
      .replaceAll('/', '.')} at ${minutes}`
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  })

  useEffect(() => {
    setInputValue(task.name.trim())
  }, [])

  return (
    <SupremeTaskBox>
      <MainTaskBox>
        <ButtonBox>
          <TaskImage
            onClick={() => {
              handlePush(taskStatus, setTaskStatus)
              Api.updateTask({ taskId: task.id })
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
              placeholder={placeholder}
              backgroundColor={inputIsFocused ? 'white' : 'transparent'}
              border={inputIsFocused ? '1px solid blue' : 'none'}
              onFocus={(e) => {
                if (inputValue.trim() !== '') {
                  handleInputFocus(e)
                }
              }}
              onBlur={(e) => {
                if (inputValue.trim() !== '') {
                  handleInputFocus(e)
                } else {
                  handleValidation('I need a name!')
                }
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
          returnDeleteModal={returnDeleteModal('delete', task.id)}
          modalDeleteIsOpen={modalDeleteIsOpen}
          setModalDeleteIsOpen={setModalDeleteIsOpen}
        />
      ) : (
        ''
      )}
    </SupremeTaskBox>
  )
}
