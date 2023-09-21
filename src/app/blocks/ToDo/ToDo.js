import React, { useState } from 'react'
import {
  ToDoContainer,
  TopContainer,
  ToDoCell,
  UserNameCell,
  CellImage,
  BottomContainer,
  AsideContainer,
  AsideList,
  AsideBlock,
  AsideBlock_active,
  AsideBlockTask,
  AsideBlockTaskInnerBox,
  AsideBlockImage,
  AsideBlockImageCentered,
  BottomBlockContainer,
} from './ToDoStyles'
import Task from '../Task/Task'
import TaskEdition from '../TaskEdition/TaskEdition'

export default function ToDo({}) {
  const [taskName, setTaskName] = useState('Task 1')
  const [userName, setUserName] = useState('UserName')

  return (
    <ToDoContainer>
      <TopContainer>
        <ToDoCell>To-Do</ToDoCell>
        <UserNameCell>{userName}</UserNameCell>
        <CellImage src="profile.svg"></CellImage>
      </TopContainer>
      <BottomContainer>
        <AsideContainer>
          <AsideList>
            <AsideBlock_active type="button">
              <AsideBlockImage src="calendar.svg"></AsideBlockImage> Today
            </AsideBlock_active>
            <AsideBlock type="button">
              <AsideBlockImage src="doneSolid.svg"></AsideBlockImage> All
            </AsideBlock>
            <AsideBlock>
              <AsideBlockImage src="arrows.svg"></AsideBlockImage> Date
            </AsideBlock>
          </AsideList>
          <AsideBlockTask>
            <AsideBlockTaskInnerBox>
              <AsideBlockImageCentered src="addTask.svg"></AsideBlockImageCentered>{' '}
              Add Task
            </AsideBlockTaskInnerBox>
          </AsideBlockTask>
        </AsideContainer>
        <BottomBlockContainer>
          <Task taskState={true} taskTag={taskName} />
          <Task taskState={false} taskTag={taskName} />
          <Task taskState={false} taskTag={taskName} />
          <TaskEdition />
        </BottomBlockContainer>
      </BottomContainer>
    </ToDoContainer>
  )
}
