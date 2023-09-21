import React, { useState } from 'react'
import Modal from 'react-modal'
import { ModalProvider } from 'styled-react-modal'
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
import {
  ModalContainer,
  CloseButton,
  ModalHeader,
  ModalBox,
  ModalInput,
  SaveButton,
  ModalLittleBox,
  ModalSigns,
} from '../ModalWindow/ModalWindowStyles'
import Task from '../Task/Task'
import TaskEdition from '../TaskEdition/TaskEdition'

export default function ToDo() {
  const [taskName, setTaskName] = useState('Task 1')
  const [userName, setUserName] = useState('UserName')

  Modal.setAppElement('#modal')

  const [modalIsOpen, setModalIsOpen] = useState(false)

  function toggleModal() {
    setModalIsOpen(!modalIsOpen)
  }

  return (
    <ToDoContainer>
      <TopContainer>
        <ToDoCell>To-Do</ToDoCell>
        <UserNameCell>{userName}</UserNameCell>
        <CellImage src="profile.svg"></CellImage>
      </TopContainer>
      <BottomContainer>
        <AsideContainer id="modal">
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
          <AsideBlockTask onClick={toggleModal}>
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
      <ModalProvider>
        <ModalContainer
          isOpen={modalIsOpen}
          onBackgroundClick={toggleModal}
          onEscapeKeydown={toggleModal}
        >
          <ModalHeader>Create task</ModalHeader>
          <form>
            <ModalInput placeholder="Enter text..." />
          </form>
          <ModalBox>
            <ModalLittleBox>
              <ModalSigns alt="green circle" src="doneGreen.svg" />
              <SaveButton type="button">Save</SaveButton>
            </ModalLittleBox>
            <ModalLittleBox onClick={toggleModal}>
              <ModalSigns alt="grey cross" src="cross.svg" />
              <CloseButton type="button"> Close</CloseButton>
            </ModalLittleBox>
          </ModalBox>
        </ModalContainer>
      </ModalProvider>
    </ToDoContainer>
  )
}
