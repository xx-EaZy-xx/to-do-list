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
  done,
}) {
  const [taskStatus, setTaskStatus] = useState(false)
  const [taskVisible, setTaskVisible] = useState(true)
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

  function handleTaskDone() {
    if (done) {
      done = false
    } else {
      done = true
    }
    console.log(done)
  }

  function handleInputFocus() {
    if (inputIsFocused === false) {
      inputRef.current.focus()
      setInputIsFocused(true)
    } else {
      inputRef.current.blur()
      setInputIsFocused(false)
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

  useEffect(() => {
    setInputValue(taskTag)
  }, [])

  return (
    <>
      {taskVisible ? (
        <SupremeTaskBox>
          <MainTaskBox>
            <ButtonBox>
              <TaskImage
                onClick={() => {
                  handlePush(taskStatus, setTaskStatus)
                  handleTaskDone()
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
      ) : (
        ''
      )}
    </>
  )
}
