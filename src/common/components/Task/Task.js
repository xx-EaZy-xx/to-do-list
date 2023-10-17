import React, { useState, useEffect, useRef } from 'react'
import { updateTask } from '@/app/services/TaskApi'
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
  const [valError, setValError] = useState('')
  const inputRef = useRef(null)
  const weekDays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]

  function handleInputChange(e) {
    setInputValue(e.target.value)
  }
  function handleTaskStatus() {
    setTaskStatus(!taskStatus)
  }
  function handlePointsPushed() {
    setArePointsPushed(!arePointsPushed)
  }

  async function handleInputFocus(e) {
    if (e.type === 'focus') {
      setInputIsFocused(true)
    } else if (e.type === 'blur') {
      inputValue.trim() === '' ? setPlaceholder('AAA') : setPlaceholder('')
      setInputIsFocused(false)
      //скажи нет одинаковым названиям тасок
      if (inputValue.trim() !== '') {
        const updatedTask = await updateTask({
          taskName: inputValue,
          taskId: task.id,
        })
        setValError(+updatedTask?.message?.slice(-3))
        handleFetch()
      } else {
        setPlaceholder('Task should be named')
        setInputIsFocused(true)
      }
    }
  }
  function handleKeyPress({ key }) {
    if (key === 'Escape' || key === 'Enter') {
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
      return day === new Date().getDay()
        ? 'Today'
        : weekDays.filter((el, i) => {
            return day === i
          })[0]
    }
    return `${getDayOfTheWeek(dayOfTheWeek)} on ${task.date
      .slice(0, 10)
      .replaceAll('/', '.')} at ${minutes}`
  }

  useEffect(() => {
    setInputValue(task.name.trim())
  }, [])
  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  })
  //Валидация инпута внутри таски
  useEffect(() => {
    if (valError === 400) {
      setInputValue('')
      setPlaceholder('No repeats!')
      setInputIsFocused(true)
      handleFetch()
      setValError('')
    }
  }, [valError, inputIsFocused])

  return (
    <SupremeTaskBox>
      <MainTaskBox>
        <ButtonBox>
          <TaskImage
            onClick={() => {
              handleTaskStatus()
              updateTask({ taskId: task.id })
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
                handlePointsPushed()
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
