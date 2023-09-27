import React, { useState } from 'react'
import { EditBox, EditImage, EditButtonBox } from './TaskEditionStyles'

export default function TaskEdition({
  taskKey,
  focusInput,
  returnDeleteModal,
  modalDeleteIsOpen,
  setModalDeleteIsOpen,
}) {
  const modal = returnDeleteModal(taskKey)

  return (
    <EditBox>
      <EditButtonBox type="button">
        <EditImage
          onClick={focusInput}
          alt="кнопка редактирования задачи"
          src="edit.svg"
        />
      </EditButtonBox>
      <EditButtonBox type="button">
        <EditImage
          onClick={() => {
            setModalDeleteIsOpen(true)
          }}
          alt="кнопка удаления задачи"
          src="trash.svg"
        />
      </EditButtonBox>
      {modalDeleteIsOpen ? modal : ''}
    </EditBox>
  )
}
