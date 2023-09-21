import React, { useState } from 'react'
import {
  TaskBox,
  ButtonBox,
  TaskImage,
  TaskImageLeft,
  LittleBox,
  LittleBoxLeft,
} from './TaskStyles'

export default function Task({ taskState }) {
  const [taskTime, setTaskTime] = useState('18:30')

  return (
    <TaskBox>
      <LittleBox>
        <ButtonBox>
          <TaskImage
            src={taskState ? 'done.svg' : 'doneGrey.svg'}
            alt="кнопка завершить задачу - галочка"
          ></TaskImage>
        </ButtonBox>
        Task 1
      </LittleBox>
      <LittleBoxLeft>
        Today at {taskTime}
        <ButtonBox>
          <TaskImageLeft
            src="points.svg"
            alt="кнопка ещё - 3 точки"
          ></TaskImageLeft>
        </ButtonBox>
      </LittleBoxLeft>
    </TaskBox>
  )
}
