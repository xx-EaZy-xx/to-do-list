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

export default function ToDo() {
  //Имя пользователя - позже будет приходить с сервера
  const [userName, setUserName] = useState('UserName')
  //Массив тасок (с начальным тестовым значением)
  const [tasks, setTasks] = useState([])
  //Модальные окна
  const [modalCreateIsOpen, setModalCreateIsOpen] = useState(false)
  const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState(true)
  //Сохранение значения инпута модалки создания тасок
  const [inputValue, setInputValue] = useState('')
  //Боковые кнопки
  const [buttonClick, setButtonClick] = useState('today')
  const [doneButtonClick, setDoneButtonClick] = useState('All')
  //Сортировка тасок
  const [sortingVector, setSortingVector] = useState(false)
  //Пагинация
  const [currentPage, setCurrentPage] = useState(1)

  // код Антона
  //   const [isModalOpen, setIsModalOpen] = useState('delete')
  //   const toggle = (data) => setIsModalOpen(data)

  //   <ModalWrapper $isVisible={!!isModalOpen} children={modals.isModalOpen} />

  //   const [test, setTest] = useState({
  //     dataSort: 'asc',
  //     filter: 'all',
  //     today: false,
  //   })

  //   useEffect(() => {
  //   handleTasks()
  //   }, [tasks,test])

  //   const handleTasks = () =>{
  //     let sortedTasks = [...tasks]
  //     if (status !== 'all') {
  //       oldTasks = oldTasks.filter((task) =>
  //         status === ' done' ? task.done === true : task.done === false
  //       )
  //     }
  //     if (today) tasks.filter((task) => task.date <= today)
  //     oldTasks.sort((a, b) =>
  //       date === 'asc' ? a.date -   b.date : b.date - a.date
  //     )
  //   setTasks(sortedTasks)
  //   }
  // код Антона

  //Сортировка тасок
  function handleSortingByDate() {
    console.log(sortingVector)
    setSortingVector(!sortingVector)
    sorting(sortingVector)
  }

  //Модальные окна
  function handleModalOpen(arg) {
    setModalCreateIsOpen(arg)
    setInputValue('')
  }

  function handleModalDeleteOpen(arg) {
    setModalDeleteIsOpen(arg)
    console.log(modalDeleteIsOpen)
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
      setButtonClick('today')
      setDoneButtonClick(doneButtonClick)
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
  function pagination() {
    const paginatedArr = tasks.map((el) => {
      return tasks.slice[(el * 10, el * 10 + 10)]
    })

    console.log(paginatedArr)
  }

  const paginate = (pageNumber) => {
    const postsPerPage = 10
    const pageCount = Math.ceil(tasks.length / postsPerPage)
    const indexOfLastPost = pageNumber * postsPerPage
    const indexOfFirstPost = postsPerPage * (pageNumber - 1)
    const currentPosts = tasks.slice(indexOfFirstPost, indexOfLastPost)

    setTasks(currentPosts)
    setCurrentPage(pageCount < currentPage ? pageCount : pageNumber)
  }

  // useEffect(() => {
  //   paginate(currentPage)
  // }, [tasks])

  function sorting(arg) {
    if (arg === false) {
      const filteredTasks = tasks.sort((a, b) => (b.key > a.key ? 1 : -1))
      setTasks(filteredTasks)
      console.log(filteredTasks)
    } else if (arg === true) {
      const filteredTasks = tasks.sort((a, b) => (a.key > b.key ? 1 : -1))
      setTasks(filteredTasks)
      console.log(filteredTasks)
    }
  }

  useEffect(() => {
    console.log(tasks)
  }, [tasks])

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
              onClick={() => {
                handleButtonClick('all')
              }}
              active={buttonClick === 'all'}
              type="button"
            >
              <AsideBlockImage
                src={
                  buttonClick === 'all' ? 'purpleCircle.svg' : 'doneSolid.svg'
                }
              ></AsideBlockImage>
              {doneButtonClick}
            </AsideBlock>
            <AsideBlock
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
              key={task.key}
              taskKey={task.key}
              taskTag={task.name}
              taskDate={task.date}
              tasks={tasks}
              deleteTask={deleteTask}
              returnDeleteModal={returnDeleteModal}
              modalDeleteIsOpen={modalDeleteIsOpen}
              setModalDeleteIsOpen={setModalDeleteIsOpen}
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
    </ToDoContainer>
  )
}
