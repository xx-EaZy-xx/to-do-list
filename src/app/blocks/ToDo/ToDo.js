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
  const [userName, setUserName] = useState('UserName')
  //Массив тасок (с начальным тестовым значением)
  const [tasks, setTasks] = useState([])
  const [currentTasks, setCurrentTasks] = useState([])
  const [timeToFetch, setTimeToFetch] = useState(false)
  //Пагинация
  const [page, setPage] = useState(1)
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

  function handleFetch() {
    setTimeToFetch(!timeToFetch)
  }

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

    //Сортировка по today
    // if (buttonClick === 'today') {
    //   return tasks.filter((task) => task.date <= today)
    // }
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
      addNewTask(inputValue)
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

  //Пагинация
  const paginate = (pageNumber) => {
    const pageCount = Math.ceil(tasks.length / postsPerPage)
    const indexOfLastPost = pageNumber * postsPerPage
    const indexOfFirstPost = postsPerPage * (pageNumber - 1)
    const currentPosts = tasks.slice(indexOfFirstPost, indexOfLastPost)
    setCurrentTasks(currentPosts)
    setPage(pageCount < page ? pageCount : pageNumber)
  }
  useEffect(() => {
    paginate(page)
    if (tasks.length > page * postsPerPage) {
      setCurrentTasks(tasks)
      paginate(page + 1)
    }
  }, [tasks])

  useEffect(() => {
    paginate(page)
  }, [sortingVector])

  //Удаление задач
  function deleteTask(taskId) {
    Api.deleteTask(taskId)
    const puredArr = tasks.filter((el) => el.key !== taskId)
    setTasks(puredArr)
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
    Api.postTask({ name })
    handleFetch()
  }
  //Запросы с сервера
  useEffect(() => {
    Api.getTasks(1, 'All').then((res) => {
      setTasks(res.data)
    })
  }, [])
  useEffect(() => {
    Api.getTasks(1, 'All').then((res) => {
      setTasks(res.data)
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
