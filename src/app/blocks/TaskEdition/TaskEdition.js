import React from 'react'
import { EditBox, EditImage, EditButtonBox } from './TaskEditionStyles'

export default function TaskEdition({
  focusInput,
  returnDeleteModal,
  modalDeleteIsOpen,
  setModalDeleteIsOpen,
}) {
  return (
    <EditBox>
      <EditButtonBox type="button">
        <EditImage
          onClick={focusInput}
          alt="кнопка редактирования задачи"
          src="edit.svg"
        />
      </EditButtonBox>
      <EditButtonBox
        autoFocus
        type="button"
        onClick={() => {
          setModalDeleteIsOpen(true)
        }}
      >
        <EditImage alt="кнопка удаления задачи" src="trash.svg" />
      </EditButtonBox>
      {modalDeleteIsOpen ? returnDeleteModal : ''}
    </EditBox>
  )
}
