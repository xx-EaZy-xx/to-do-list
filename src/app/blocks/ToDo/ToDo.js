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
} from './ToDoStyles'
import Task from '../Task/Task'
import ModalWindow from '../ModalWindow/ModalWindow'
import Pagination from '../Pagination/Pagination'

export default function ToDo() {
  //Имя пользователя - позже будет приходить с сервера
  const [userName] = useState('XxX_Oleg_XxX')
  //Массив тасок (с начальным тестовым значением)
  const [tasks, setTasks] = useState([])
  const [taskNumber, setTaskNumber] = useState(0)
  const [timeToFetch, setTimeToFetch] = useState(false)
  //Сортировка
  const [sortToday, setSortToday] = useState('any')
  const [sortVector, setSortVector] = useState('DESC')
  //Пагинация
  const [page, setPage] = useState(1)
  const [postsPerPage] = useState(7)
  //Модальные окна
  const [modalCreateIsOpen, setModalCreateIsOpen] = useState(false)
  const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState(false)
  //Сохранение значения инпута модалки создания тасок
  const [inputValue, setInputValue] = useState('')
  //Боковые кнопки
  const [button, setButton] = useState({
    main: 'today',
    drop: 'All',
    dropStatus: false,
    vectorStatus: false,
  })

  //Немного пагинации
  function handlePage(arg) {
    setPage(arg)
    handleFetch()
  }
  //Нажатие кнопок

  function handleButtonPush(arg, arg2, arg3, arg4, arg5) {
    setButton({
      main: arg,
      drop: arg2 ?? button.drop,
      dropStatus: !!arg3 ?? !!button.dropStatus,
      todayStatus: !!arg4 ?? !!button.todayStatus,
      vectorStatus: !!arg5 ?? !!button.vectorStatus,
    })
    handleFetch()
  }

  function changeSortToday() {
    if (sortToday === 'today') {
      setSortToday('any')
    } else if (sortToday === 'any') {
      setSortToday('today')
    }
    handlePage(1)
  }

  function changeSortVector() {
    if (sortVector === 'ASC') {
      setSortVector('DESC')
    } else if (sortVector === 'DESC') {
      setSortVector('ASC')
    }
  }

  //Модальные окна
  function handleModalOpen(arg) {
    setModalCreateIsOpen(arg)
    setInputValue('')
  }

  function handleModalDeleteOpen(arg) {
    setModalDeleteIsOpen(arg)
  }

  function handleInputChange(e) {
    setInputValue(e.target.value)
  }
  function insertInputValue() {
    if (inputValue.trim() !== '') {
      addNewTask(inputValue)
    } else {
      return
    }
  }

  //Удаление задач
  function deleteTask(taskId) {
    Api.deleteTask(taskId).then(() => {
      const puredArr = tasks.filter((el) => el.key !== taskId)
      setTasks(puredArr)
    })
  }
  function returnDeleteModal(arg) {
    return (
      <ModalWindow
        taskId={arg}
        isOpen={modalDeleteIsOpen}
        setIsOpen={handleModalDeleteOpen}
        poly={'delete'}
        deleteTask={() => {
          deleteTask(arg)
          handleFetch()
        }}
      />
    )
  }
  //Добавление новых задач
  function addNewTask(name) {
    Api.postTask({ name }).then(() => handleFetch())
  }
  //Запросы с сервера
  function handleFetch() {
    setTimeToFetch(!timeToFetch)
  }
  useEffect(() => {
    Api.getTasks(page, button.drop, sortVector, sortToday).then((res) => {
      setTasks(res.data.tasks)
      setTaskNumber(res.data.total.length)
    })
  }, [timeToFetch])
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
            <AsideBlock
              id="today"
              onClick={() => {
                handleButtonPush(
                  button.main,
                  button.drop,
                  button.dropStatus,
                  !button.todayStatus
                )
                changeSortToday()
              }}
              active={button.todayStatus}
              type="button"
            >
              <AsideBlockImage
                src={button.todayStatus ? 'calendar.svg' : 'greyCalendar.svg'}
              ></AsideBlockImage>{' '}
              Today
            </AsideBlock>
            <AsideBlock
              id="all"
              onClick={() => {
                handleButtonPush(
                  'All',
                  button.drop,
                  !button.dropStatus,
                  button.todayStatus
                )
              }}
              active={button.main === 'All'}
              type="button"
            >
              <AsideBlockImage
                src={
                  button.main === 'All' ? 'purpleCircle.svg' : 'doneSolid.svg'
                }
              ></AsideBlockImage>
              {button.drop}
            </AsideBlock>
            <AsideBlock
              id="date"
              onClick={() => {
                handleButtonPush(
                  button.main,
                  button.drop,
                  button.dropStatus,
                  button.todayStatus,
                  !button.vectorStatus
                )
                changeSortVector()
              }}
              active={button.vectorStatus}
              display={button.dropStatus ? 'none' : 'flex'}
              type="button"
            >
              <AsideBlockImage
                src={button.vectorStatus ? 'arrowsPurple.svg' : 'arrows.svg'}
              ></AsideBlockImage>
              Date
            </AsideBlock>
          </AsideList>
          <CommunistAsideList display={button.dropStatus ? 'flex' : 'none'}>
            <CommunistAsideBlock
              id="All"
              active={button.drop === 'All'}
              type="button"
              backgroundColor={
                button.drop === 'All' ? 'rgba(147, 51, 234, 0.2)' : ''
              }
              onClick={() => {
                handleButtonPush(
                  button.main,
                  'All',
                  button.dropStatus,
                  button.todayStatus
                )
              }}
            >
              <AsideBlockImage src="purpleCircle.svg"></AsideBlockImage> All
            </CommunistAsideBlock>
            <CommunistAsideBlock
              id="Done"
              active={button.drop === 'Done'}
              type="button"
              backgroundColor={
                button.drop === 'Done' ? 'rgba(147, 51, 234, 0.2)' : ''
              }
              onClick={() => {
                handleButtonPush(
                  button.main,
                  'Done',
                  button.dropStatus,
                  button.todayStatus
                )
              }}
            >
              <AsideBlockImage src="purpleCircle.svg"></AsideBlockImage> Done
            </CommunistAsideBlock>
            <CommunistAsideBlock
              id="Undone"
              active={button.drop === 'Undone'}
              type="button"
              backgroundColor={
                button.drop === 'Undone' ? 'rgba(147, 51, 234, 0.2)' : ''
              }
              onClick={() => {
                handleButtonPush(
                  button.main,
                  'Undone',
                  button.dropStatus,
                  button.todayStatus
                )
              }}
            >
              <AsideBlockImage src="purpleCircle.svg"></AsideBlockImage> Undone
            </CommunistAsideBlock>
          </CommunistAsideList>
          <AsideBlockTask
            onClick={() => {
              handleModalOpen(true)
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
              key={task.id}
              taskKey={task.id}
              taskTag={task.name.trim()}
              taskDate={task.date}
              tasks={tasks}
              deleteTask={deleteTask}
              returnDeleteModal={returnDeleteModal}
              modalDeleteIsOpen={modalDeleteIsOpen}
              setModalDeleteIsOpen={setModalDeleteIsOpen}
              done={task.isDone}
              handleFetch={() => {
                handleFetch()
              }}
            ></Task>
          ))}
        </BottomBlockContainer>
      </BottomContainer>
      <ModalWindow
        isOpen={modalCreateIsOpen}
        setIsOpen={handleModalOpen}
        poly={'create'}
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleInputChange={handleInputChange}
        addTask={insertInputValue}
      />
      {taskNumber <= postsPerPage ? (
        ''
      ) : (
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={taskNumber}
          handlePage={handlePage}
          currentPage={page}
        />
      )}
    </ToDoContainer>
  )
}
