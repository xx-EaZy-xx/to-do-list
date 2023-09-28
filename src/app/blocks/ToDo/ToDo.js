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
  const [doneUndoneMode, setDoneUndoneMode] = useState('')
  //Пагинация
  const [currentPage, setCurrentPage] = useState(1)
  const [currentPosts, setCurrentPosts] = useState([])

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
    setSortingVector(!sortingVector)
    sorting(sortingVector)
  }

  function doneSorting() {
    const doneTasks = tasks.filter((task) => {
      return task.done !== false
    })
    console.log(doneTasks)
    setTasks(doneTasks)
  }

  function undoneSorting() {
    const undoneTasks = tasks.filter((task) => {
      return task.done === false
    })
    console.log(undoneTasks)
    setTasks(undoneTasks)
  }

  function sorting(arg) {
    if (arg === false) {
      const filteredTasks = tasks.sort((a, b) => (b.key > a.key ? 1 : -1))
      setTasks(filteredTasks)
    } else if (arg === true) {
      const filteredTasks = tasks.sort((a, b) => (a.key > b.key ? 1 : -1))
      setTasks(filteredTasks)
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

  function consoleLog() {
    console.log(Math.ceil(tasks.length / 10))
  }

  function pagination() {
    const paginatedArr = tasks.map((el) => {
      return tasks.slice[(el * 10, el * 10 + 10)]
    })
  }

  // useEffect(() => {
  //   paginate(currentPage)
  // }, [tasks])

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
                consoleLog()
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
                doneSorting()
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
                undoneSorting()
              }}
            >
              <AsideBlockImage src="purpleCircle.svg"></AsideBlockImage> Undone
            </CommunistAsideBlock>
            {tasks.length >= 10 ? (
              <Pagination tasks={tasks} setTasks={setTasks} />
            ) : (
              ''
            )}
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
    </ToDoContainer>
  )
}
