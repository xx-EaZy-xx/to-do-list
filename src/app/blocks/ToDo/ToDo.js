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
  const [sortVector, setSortVector] = useState('ASC')
  //Пагинация
  const [page, setPage] = useState(1)
  const [postsPerPage] = useState(7)
  //Модальные окна
  const [modalCreateIsOpen, setModalCreateIsOpen] = useState(false)
  const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState(false)
  //Сохранение значения инпута модалки создания тасок
  const [inputValue, setInputValue] = useState('')
  //Боковые кнопки
  const [buttonClick, setButtonClick] = useState('all')
  const [doneButtonClick, setDoneButtonClick] = useState('All')

  //Немного пагинации
  function handlePage(arg) {
    setPage(arg)
    handleFetch()
  }
  //Нажатие кнопок
  function changeSortVector() {
    if (sortVector === 'ASC') {
      setSortVector('DESC')
    } else if (sortVector === 'DESC') {
      setSortVector('ASC')
    }
  }
  const handleButtonClick = (button) => {
    setButtonClick(button)
    if (buttonClick === 'all') {
      setButtonClick(doneButtonClick)
    }
    handleFetch()
  }
  const handleDoneClick = (button) => {
    setDoneButtonClick(button)
    setPage(1)
    handleFetch()
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
    if (inputValue !== '') {
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
    Api.getTasks(page, doneButtonClick, sortVector).then((res) => {
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
                handleButtonClick('today')
                handleDoneClick('today')
              }}
              active={buttonClick === 'today'}
              type="button"
            >
              <AsideBlockImage
                src={
                  buttonClick === 'today' ? 'calendar.svg' : 'greyCalendar.svg'
                }
              ></AsideBlockImage>{' '}
              Today
            </AsideBlock>
            <AsideBlock
              id="all"
              onClick={() => {
                handleButtonClick('all')
              }}
              active={buttonClick === 'all' || buttonClick === doneButtonClick}
              type="button"
            >
              <AsideBlockImage
                src={
                  buttonClick === 'all' || buttonClick === doneButtonClick
                    ? 'purpleCircle.svg'
                    : 'doneSolid.svg'
                }
              ></AsideBlockImage>
              {buttonClick === 'today' ? 'All' : doneButtonClick}
            </AsideBlock>
            <AsideBlock
              id="date"
              onClick={() => {
                handleButtonClick('date')
                changeSortVector()
              }}
              active={buttonClick === 'date'}
              display={buttonClick === 'all' ? 'none' : 'flex'}
              type="button"
            >
              <AsideBlockImage
                src={buttonClick === 'date' ? 'arrowsPurple.svg' : 'arrows.svg'}
              ></AsideBlockImage>
              Date
            </AsideBlock>
          </AsideList>
          <CommunistAsideList display={buttonClick === 'all' ? 'flex' : 'none'}>
            <CommunistAsideBlock
              id="All"
              active={doneButtonClick === 'All'}
              type="button"
              backgroundColor={
                doneButtonClick === 'All' ? 'rgba(147, 51, 234, 0.2)' : ''
              }
              onClick={() => {
                handleDoneClick('All')
              }}
            >
              <AsideBlockImage src="purpleCircle.svg"></AsideBlockImage> All
            </CommunistAsideBlock>
            <CommunistAsideBlock
              id="Done"
              active={doneButtonClick === 'Done'}
              type="button"
              backgroundColor={
                doneButtonClick === 'Done' ? 'rgba(147, 51, 234, 0.2)' : ''
              }
              onClick={() => {
                handleDoneClick('Done')
              }}
            >
              <AsideBlockImage src="purpleCircle.svg"></AsideBlockImage> Done
            </CommunistAsideBlock>
            <CommunistAsideBlock
              id="Undone"
              active={doneButtonClick === 'Undone'}
              type="button"
              backgroundColor={
                doneButtonClick === 'Undone' ? 'rgba(147, 51, 234, 0.2)' : ''
              }
              onClick={() => {
                handleDoneClick('Undone')
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
              partialDate={task.partialDate}
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
        />
      )}
    </ToDoContainer>
  )
}
