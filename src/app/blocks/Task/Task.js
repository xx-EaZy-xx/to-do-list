import React, { useState, useEffect, useRef } from 'react'
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
  deleteTask,
  returnDeleteModal,
  modalDeleteIsOpen,
  setModalDeleteIsOpen,
}) {
  const [taskStatus, setTaskStatus] = useState(false)
  const [arePointsPushed, setArePointsPushed] = useState(false)
  const [inputIsFocused, setInputIsFocused] = useState(false)
  const [inputValue, setInputValue] = useState('')

  const inputRef = useRef(null)

  function handleInput(e) {
    setInputValue(e.target.value)
  }

  function handlePush(state, setState) {
    setState(!state)
  }

  function handleInputFocused({ key }) {
    if (inputIsFocused === false) {
      inputRef.current.focus()
      setInputIsFocused(true)
    } else {
      inputRef.current.blur()
      setInputIsFocused(false)
    }
    switch (key) {
      case 'Escape':
        inputRef.current.blur()
        setInputIsFocused(false)
      case 'Enter':
        inputRef.current.blur()
        setInputIsFocused(false)
        break
    }
  }

  function handleKeyPress({ key }) {
    switch (key) {
      case 'Escape':
        inputRef.current.blur()
        setInputIsFocused(false)
      case 'Enter':
        inputRef.current.blur()
        setInputIsFocused(false)
        break
    }
  }

  function handleData() {
    function getDayOfTheWeek() {
      if (taskDate.getDay() === new Date().getDay()) {
        return 'Today'
      } else if (taskDate.getDay() === 0) {
        return 'Sunday'
      } else if (taskDate.getDay() === 1) {
        return 'Monday'
      } else if (taskDate.getDay() === 2) {
        return 'Tuesday'
      } else if (taskDate.getDay() === 3) {
        return 'Wednesday'
      } else if (taskDate.getDay() === 4) {
        return 'Thursday'
      } else if (taskDate.getDay() === 5) {
        return 'Friday'
      } else if (taskDate.getDay() === 6) {
        return 'Saturday'
      }
    }
    const isSingle =
      Array.from(String(taskDate.getMinutes())).length === 1 ? '0' : ''

    return `${getDayOfTheWeek()} at ${taskDate.getHours()}:${isSingle}${taskDate.getMinutes()}`
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  })

  return (
    <SupremeTaskBox>
      <MainTaskBox>
        <ButtonBox>
          <TaskImage
            onClick={() => {
              handlePush(taskStatus, setTaskStatus)
            }}
            src={taskStatus ? 'done.svg' : 'doneGrey.svg'}
            alt="кнопка завершить задачу - галочка"
          ></TaskImage>
        </ButtonBox>
        <TaskBox>
          <LittleBox>
            <TaskInput
              ref={inputRef}
              placeholder={taskTag}
              value={inputValue}
              backgroundColor={inputIsFocused ? 'white' : 'transparent'}
              border={inputIsFocused ? '1px solid blue' : 'none'}
              onFocus={(e) => {
                handleInputFocused(e)
                setInputValue(taskTag)
              }}
              onBlur={(e) => {
                handleInputFocused(e)
              }}
              onChange={(e) => {
                handleInput(e)
              }}
            ></TaskInput>
          </LittleBox>
          <LittleBoxLeft>
            {handleData()}
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
          taskKey={taskKey}
          focusInput={handleInputFocused}
          deleteTask={deleteTask}
          returnDeleteModal={returnDeleteModal}
          modalDeleteIsOpen={modalDeleteIsOpen}
          setModalDeleteIsOpen={setModalDeleteIsOpen}
        />
      ) : (
        ''
      )}
    </SupremeTaskBox>
  )
}
