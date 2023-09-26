import React, { useState } from 'react'
import {
  SupremeTaskBox,
  MainTaskBox,
  TaskBox,
  ButtonBox,
  TaskImage,
  TaskImageLeft,
  LittleBox,
  LittleBoxLeft,
} from './TaskStyles'
import TaskEdition from '../TaskEdition/TaskEdition'

export default function Task({ taskTag, taskDate, taskIsDone, toggleModal }) {
  const [isTaskPushed, setIsTaskPushed] = useState(false)
  const [isCheckPushed, setIsCheckPushed] = useState(false)

  function handleTaskPush() {
    setIsTaskPushed(!isTaskPushed)
  }

  function handleCheckPush() {
    setIsCheckPushed(!isCheckPushed)
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
    return `${getDayOfTheWeek()} at ${taskDate.getHours()}:${taskDate.getMinutes()}`
  }

  return (
    <SupremeTaskBox>
      <MainTaskBox>
        <ButtonBox>
          <TaskImage
            onClick={handleCheckPush}
            src={isCheckPushed ? 'done.svg' : 'doneGrey.svg'}
            alt="кнопка завершить задачу - галочка"
          ></TaskImage>
        </ButtonBox>
        <TaskBox>
          <LittleBox>{taskTag}</LittleBox>
          <LittleBoxLeft>
            {handleData()}
            <ButtonBox onClick={handleTaskPush}>
              <TaskImageLeft
                src="points.svg"
                alt="кнопка ещё - 3 точки"
              ></TaskImageLeft>
            </ButtonBox>
          </LittleBoxLeft>
        </TaskBox>
      </MainTaskBox>
      {isTaskPushed ? <TaskEdition toggleModal={toggleModal} /> : ''}
    </SupremeTaskBox>
  )
}
