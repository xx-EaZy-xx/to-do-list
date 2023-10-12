import React, { useState, useEffect } from 'react'
import { Api } from '../../utils/MainApi'
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
  AsideBlockTask,
  AsideBlockTaskInnerBox,
  AsideBlockImage,
  AsideBlockImageCentered,
  BottomBlockContainer,
  CommunistAsideList,
  CommunistAsideBlock,
  VanishingMessage,
} from './ToDo.styled'
import Task from '../Task/Task'
import ModalWindow from '../ModalWindow/ModalWindow'
import Pagination from '../Pagination/Pagination'

export default function ToDo() {
  //Имя пользователя - позже будет приходить с сервера
  const [userName] = useState('XxX_Oleg_XxX')
  //Массив тасок (с начальным пустым значением)
  const [tasks, setTasks] = useState([])
  const [totalTasks, setTotalTasks] = useState(0)
  const [timeToFetch, setTimeToFetch] = useState(false)
  //Модальные окна
  const [modalOpened, setModalOpened] = useState({
    creation: false,
    deletion: false,
  })
  //Боковые кнопки
  const [button, setButton] = useState({
    main: 'All',
    drop: 'All',
    dropStatus: false,
    todayStatus: 'any',
    vectorStatus: 'ASC',
  })
  //Пагинация
  const [page, setPage] = useState(1)
  const tasksPerPage = 7

  //Хэндлер пагинации
  function handlePage(arg) {
    setPage(arg)
  }
  //Нажатие кнопок
  function handleButtonPush({
    main = button.main,
    drop = button.drop,
    dropStatus = button.dropStatus,
    todayStatus = button.todayStatus,
    vectorStatus = button.vectorStatus,
  }) {
    setButton({ main, drop, dropStatus, todayStatus, vectorStatus })
    handleFetch()
  }
  function toggleSortToday() {
    if (button.todayStatus === 'today') {
      Math.ceil(totalTasks.length / tasksPerPage)
      handleButtonPush({ todayStatus: 'any' })
    } else if (button.todayStatus === 'any') {
      handleButtonPush({ todayStatus: 'today' })
    }
    handlePage(1)
  }
  function toggleSortVector() {
    if (button.vectorStatus === 'ASC') {
      handleButtonPush({ vectorStatus: 'DESC' })
    } else if (button.vectorStatus === 'DESC') {
      handleButtonPush({ vectorStatus: 'ASC' })
    }
  }

  //Модальные окна
  function handleModalCreateOpen(arg) {
    setModalOpened({ creation: arg ?? !modalOpened.creation })
  }

  function handleModalDeleteOpen(arg) {
    setModalOpened({ deletion: arg ?? !modalOpened.deletion })
  }

  function returnModal(modal, taskId) {
    return modal === 'create' ? (
      <ModalWindow
        isOpen={modalOpened.creation}
        setIsOpen={handleModalCreateOpen}
        poly={'create'}
        handleFetch={handleFetch}
      />
    ) : (
      <ModalWindow
        taskId={taskId}
        isOpen={modalOpened.deletion}
        setIsOpen={handleModalDeleteOpen}
        poly={'delete'}
        deleteTask={() => {
          deleteTask(taskId)
          handleModalDeleteOpen(false)
          handleFetch()
        }}
      />
    )
  }

  //Удаление задач
  function deleteTask(taskId) {
    Api.deleteTask(taskId).then(() => {
      const puredArr = tasks.filter((el) => el.key !== taskId)
      setTasks(puredArr)
      handleFetch()
    })
  }
  //Запросы с сервера
  function handleFetch() {
    setTimeToFetch(!timeToFetch)
  }
  useEffect(() => {
    Api.getTasks(
      page,
      button.drop,
      button.vectorStatus,
      button.todayStatus
    ).then((res) => {
      const { tasks, total } = res.data
      setTasks(tasks)
      setTotalTasks(total)
      tasks === 0 ? setPage(page - 1) : ''
    })
  }, [timeToFetch, page]) //Нужно дописать зависимости вместо timeToFetch
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
            <AsideBlock
              onClick={() => {
                handleButtonPush({ todayStatus: !button.todayStatus })
                toggleSortToday()
              }}
              active={button.todayStatus === 'today'}
              type="button"
            >
              <AsideBlockImage
                src={
                  button.todayStatus === 'today'
                    ? 'calendar.svg'
                    : 'greyCalendar.svg'
                }
              ></AsideBlockImage>{' '}
              Today
            </AsideBlock>
            <AsideBlock
              onClick={() => {
                handleButtonPush({
                  main: 'All',
                  dropStatus: !button.dropStatus,
                })
              }}
              active={true}
              type="button"
            >
              <AsideBlockImage
                src={button.drop ? 'purpleCircle.svg' : 'doneSolid.svg'}
              ></AsideBlockImage>
              {button.drop}
            </AsideBlock>
            <AsideBlock
              onClick={() => {
                toggleSortVector()
              }}
              active={button.vectorStatus === 'DESC'}
              display={button.dropStatus ? 'none' : 'flex'}
              type="button"
            >
              <AsideBlockImage
                src={
                  button.vectorStatus === 'DESC'
                    ? 'arrowsPurple.svg'
                    : 'arrows.svg'
                }
              ></AsideBlockImage>
              Date
            </AsideBlock>
          </AsideList>
          <CommunistAsideList display={button.dropStatus ? 'flex' : 'none'}>
            <CommunistAsideBlock
              active={button.drop === 'All'}
              type="button"
              backgroundColor={
                button.drop === 'All' ? 'rgba(147, 51, 234, 0.2)' : ''
              }
              onClick={() => {
                handleButtonPush({ drop: 'All' })
              }}
            >
              <AsideBlockImage src="purpleCircle.svg"></AsideBlockImage> All
            </CommunistAsideBlock>
            <CommunistAsideBlock
              active={button.drop === 'Done'}
              type="button"
              backgroundColor={
                button.drop === 'Done' ? 'rgba(147, 51, 234, 0.2)' : ''
              }
              onClick={() => {
                handleButtonPush({ drop: 'Done' })
                handlePage(1)
              }}
            >
              <AsideBlockImage src="purpleCircle.svg"></AsideBlockImage> Done
            </CommunistAsideBlock>
            <CommunistAsideBlock
              active={button.drop === 'Undone'}
              type="button"
              backgroundColor={
                button.drop === 'Undone' ? 'rgba(147, 51, 234, 0.2)' : ''
              }
              onClick={() => {
                handleButtonPush({ drop: 'Undone' })
                handlePage(1)
              }}
            >
              <AsideBlockImage src="purpleCircle.svg"></AsideBlockImage> Undone
            </CommunistAsideBlock>
          </CommunistAsideList>
          <AsideBlockTask
            onClick={() => {
              handleModalCreateOpen(true)
            }}
          >
            <AsideBlockTaskInnerBox>
              <AsideBlockImageCentered src="addTask.svg"></AsideBlockImageCentered>{' '}
              Add Task
            </AsideBlockTaskInnerBox>
          </AsideBlockTask>
        </AsideContainer>
        <BottomBlockContainer>
          {tasks.length === 0 ? (
            <VanishingMessage>Here lie thy tasks</VanishingMessage>
          ) : (
            ''
          )}
          {tasks.map((task) => (
            <Task
              task={task}
              key={task.id}
              deleteTask={deleteTask}
              returnDeleteModal={returnModal}
              modalDeleteIsOpen={modalOpened.deletion}
              setModalDeleteIsOpen={handleModalDeleteOpen}
              handleFetch={() => {
                handleFetch()
              }}
            ></Task>
          ))}
        </BottomBlockContainer>
      </BottomContainer>
      {returnModal('create')}
      {totalTasks.length <= tasksPerPage ? (
        ''
      ) : (
        <Pagination
          tasksPerPage={tasksPerPage}
          totalTasks={totalTasks}
          handlePage={handlePage}
          page={page}
        />
      )}
    </ToDoContainer>
  )
}
