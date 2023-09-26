import React, { useState } from 'react'
import { EditBox, EditImage, EditButtonBox } from './TaskEditionStyles'

export default function TaskEdition({ toggleModal, taskKey, focusInput }) {
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
            toggleModal('delete', taskKey)
          }}
          alt="кнопка удаления задачи"
          src="trash.svg"
        />
      </EditButtonBox>
    </EditBox>
  )
}
