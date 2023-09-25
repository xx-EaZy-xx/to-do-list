import React, { useState } from 'react'
import Modal from 'react-modal'
import { ModalProvider } from 'styled-react-modal'
import { EditBox, EditImage, EditButtonBox } from './TaskEditionStyles'
import {
  ModalContainer,
  CloseButton,
  ModalHeader,
  ModalBox,
  ModalMessage,
  SaveButton,
  ModalLittleBox,
  ModalSigns,
  DeleteButton,
} from '../ModalWindow/ModalWindowStyles'

export default function TaskEdition({ deleteTask, toggleModal }) {
  Modal.setAppElement('#modal')

  const [modalIsOpen, setModalIsOpen] = useState(false)

  return (
    <EditBox>
      <EditButtonBox type="button">
        <EditImage alt="кнопка редактирования задачи" src="edit.svg" />
      </EditButtonBox>
      <EditButtonBox id="modal" type="button">
        <EditImage
          onClick={toggleModal}
          alt="кнопка удаления задачи"
          src="trash.svg"
        />
      </EditButtonBox>
      <ModalProvider>
        <ModalContainer
          isOpen={modalIsOpen}
          onBackgroundClick={toggleModal}
          onEscapeKeydown={toggleModal}
        >
          <ModalHeader>Delete task</ModalHeader>
          <ModalMessage>Are you sure about deleting this task?</ModalMessage>
          <ModalBox>
            <ModalLittleBox onClick={deleteTask}>
              <ModalSigns alt="green circle" src="trash.svg" />
              <DeleteButton type="button">Delete</DeleteButton>
            </ModalLittleBox>
            <ModalLittleBox onClick={toggleModal}>
              <ModalSigns alt="grey cross" src="cross.svg" />
              <CloseButton type="button"> Close</CloseButton>
            </ModalLittleBox>
          </ModalBox>
        </ModalContainer>
      </ModalProvider>
    </EditBox>
  )
}
