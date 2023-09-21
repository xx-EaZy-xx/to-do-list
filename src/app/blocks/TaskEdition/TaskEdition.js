import { EditBox, EditImage, EditButtonBox } from './TaskEditionStyles'

export default function TaskEdition({}) {
  return (
    <EditBox>
      <EditButtonBox type="button">
        <EditImage alt="кнопка редактирования задачи" src="edit.svg" />
      </EditButtonBox>
      <EditButtonBox type="button">
        <EditImage alt="кнопка удаления задачи" src="trash.svg" />
      </EditButtonBox>
    </EditBox>
  )
}
