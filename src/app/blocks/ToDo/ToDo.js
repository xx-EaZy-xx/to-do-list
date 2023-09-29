import React, { useState, useEffect } from 'react'
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
  const [userName, setUserName] = useState('UserName')
  //Массив тасок (с начальным тестовым значением)
  const [tasks, setTasks] = useState([])
  const [currentTasks, setCurrentTasks] = useState([])
  //Пагинация
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(7)
  //Модальные окна
  const [modalCreateIsOpen, setModalCreateIsOpen] = useState(false)
  const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState(false)
  //Сохранение значения инпута модалки создания тасок
  const [inputValue, setInputValue] = useState('')
  //Боковые кнопки
  const [buttonClick, setButtonClick] = useState('today')
  const [doneButtonClick, setDoneButtonClick] = useState('All')
  //Сортировка тасок
  const [sortingVector, setSortingVector] = useState(false)

  // код Антона
  const [test, setTest] = useState({
    dataSort: 'asc',
    filter: 'all',
    today: false,
  })

  const handleTasks = () => {
    let sortedTasks = [...tasks]
    if (doneButtonClick !== 'All') {
      sortedTasks = sortedTasks.filter((task) => {
        return doneButtonClick === 'Done'
          ? task.done === true
          : task.done === false
      })
    }
    //Осталось только найти способ поменять done/undone при нажатии на галочку внутри таски

    //Сортировка по today
    // if (buttonClick === 'today') {
    //   return tasks.filter((task) => task.date <= today)
    // }
    console.log('sortedTasks:', sortedTasks)
    setTasks(sortedTasks)
    setCurrentTasks(sortedTasks)
  }

  useEffect(() => {
    handleTasks()
  }, [test, buttonClick, doneButtonClick])
  // код Антона

  //Сортировка тасок
  function handleSortingByDate() {
    setSortingVector(!sortingVector)
    function sorting(arg) {
      if (arg === false) {
        const filteredTasks = tasks.sort((a, b) => (b.key > a.key ? 1 : -1))
        setTasks(filteredTasks)
      } else if (arg === true) {
        const filteredTasks = tasks.sort((a, b) => (a.key > b.key ? 1 : -1))
        setTasks(filteredTasks)
      }
    }
    sorting(sortingVector)
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
      newAddTask(inputValue)
    } else {
      return
    }
  }

  //Нажатие кнопок
  const handleButtonClick = (button) => {
    setButtonClick(button)
    if (buttonClick === 'all') {
      setButtonClick(doneButtonClick)
    }
  }
  const handleDoneClick = (button) => {
    setDoneButtonClick(button)
  }

  //Добавление новых задач
  function newAddTask(name) {
    const newTasks = [
      ...tasks,
      {
        name: name,
        key: +Date.now(),
        date: new Date(),
        done: false,
      },
    ]

    setTasks(newTasks)
  }

  //Удаление задач
  function deleteTask(taskId) {
    const puredArr = tasks.filter((el) => el.key !== taskId)
    setTasks(puredArr)
  }
  function returnDeleteModal(arg) {
    return (
      <ModalWindow
        isOpen={modalDeleteIsOpen}
        setIsOpen={handleModalDeleteOpen}
        poly={'delete'}
        deleteTask={() => {
          deleteTask(arg)
        }}
      />
    )
  }

  //Пагинация
  const paginate = (pageNumber) => {
    const pageCount = Math.ceil(tasks.length / postsPerPage)
    const indexOfLastPost = pageNumber * postsPerPage
    const indexOfFirstPost = postsPerPage * (pageNumber - 1)
    const currentPosts = tasks.slice(indexOfFirstPost, indexOfLastPost)
    setCurrentTasks(currentPosts)
    setCurrentPage(pageCount < currentPage ? pageCount : pageNumber)
  }
  useEffect(() => {
    paginate(currentPage)
    if (tasks.length > currentPage * postsPerPage) {
      setCurrentTasks(tasks)
      paginate(currentPage + 1)
    }
  }, [tasks])

  useEffect(() => {
    paginate(currentPage)
  }, [sortingVector])

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
                console.log(buttonClick)
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
              {doneButtonClick}
            </AsideBlock>
            <AsideBlock
              id="date"
              onClick={() => {
                handleButtonClick('date')
                handleSortingByDate()
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
          {tasks.length <= postsPerPage
            ? tasks.map((task) => (
                <Task
                  key={task.key}
                  taskKey={task.key}
                  taskTag={task.name.trim()}
                  taskDate={task.date}
                  tasks={tasks}
                  deleteTask={deleteTask}
                  returnDeleteModal={returnDeleteModal}
                  modalDeleteIsOpen={modalDeleteIsOpen}
                  setModalDeleteIsOpen={setModalDeleteIsOpen}
                  done={task.done}
                ></Task>
              ))
            : currentTasks.map((task) => (
                <Task
                  key={task.key}
                  taskKey={task.key}
                  taskTag={task.name.trim()}
                  taskDate={task.date}
                  tasks={tasks}
                  deleteTask={deleteTask}
                  returnDeleteModal={returnDeleteModal}
                  modalDeleteIsOpen={modalDeleteIsOpen}
                  setModalDeleteIsOpen={setModalDeleteIsOpen}
                  done={task.done}
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
      {tasks.length <= postsPerPage ? (
        ''
      ) : (
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={tasks.length}
          paginate={paginate}
        />
      )}
    </ToDoContainer>
  )
}
