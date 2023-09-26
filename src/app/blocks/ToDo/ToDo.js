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
  const [tasks, setTasks] = useState([
    // {
    //   name: 'fuck 1',
    //   date: new Date(2023, 1, 1, 10, 10, 40, 567),
    //   key: Date.now(),
    // },
  ])
  //Модальные окна
  const [modalIsOpen, setModalIsOpen] = useState(false)
  //Сохранение значения инпута модалки создания тасок
  const [inputValue, setInputValue] = useState('')
  //Боковые кнопки
  const [buttonClick, setButtonClick] = useState('today')
  const [doneButtonClick, setDoneButtonClick] = useState('all-inner')

  //{modalIsOpen === 'create'? modals.create : modals.delete}

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

  //Открытие/закрытие модалки

  function handleInputChange(e) {
    setInputValue(e.target.value)
  }

  const modals = {
    create: (
      <ModalWindow
        $isOpen={modalIsOpen}
        isToggled={toggleModal}
        overlayClick={handleOverlayClose}
        onEscPress={handleEscClose}
        poly={'create'}
        inputValue={inputValue}
        handleInputChange={handleInputChange}
        addTask={insertInputValue}
      />
    ),
    delete: (
      <ModalWindow
        $isOpen={modalIsOpen}
        isToggled={toggleModal}
        overlayClick={handleOverlayClose}
        onEscPress={handleEscClose}
        poly={'delete'}
        deleteTask={deleteTask}
      />
    ),
  }

  function deleteTask() {
    console.log('delete')
  }

  function toggleModal(arg) {
    setModalIsOpen(arg)
    setInputValue('')
  }
  const returnModal = () => {
    if (modalIsOpen === 'create') {
      return modals.create
    } else if (modalIsOpen === 'delete') {
      return modals.delete
    } else {
      return
    }
  }

  function insertInputValue() {
    if (inputValue !== '') {
      newAddTask(inputValue)
    } else {
      return
    }
  }

  function handleOverlayClose(e) {
    if (e.target === e.currentTarget) {
      toggleModal()
    }
  }
  function handleEscClose({ key }) {
    switch (key) {
      case 'Escape':
        toggleModal()
      case 'Enter':
        insertInputValue()
        break
    }
  }

  //Нажатие кнопок
  const handleButtonClick = (button) => {
    setButtonClick(button)
    if (buttonClick === 'all') {
      setButtonClick('today')
      setDoneButtonClick(localStorage.getItem('doneButton'))
    }
  }

  const handleDoneClick = (button) => {
    setDoneButtonClick(button)
    localStorage.setItem('doneButton', doneButtonClick)
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

  // const [test, setTest] = useState({
  //   dataSort: 'asc',
  //   filter: 'all',
  //   today: false,
  // })

  // useEffect(() => {
  //   handleTasks()
  // }, [tasks, test])

  // const handleTasks = () => {
  //   let sortedTasks = [...tasks]
  //   if (doneButtonClick !== 'all-inner') {
  //     oldTasks = sortedTasks.filter((task) =>
  //       doneButtonClick === ' done' ? task.done === true : task.done === false
  //     )
  //   }
  //   if (today) tasks.filter((task) => task.date <= today)
  //   oldTasks.sort((a, b) =>
  //     date === 'asc' ? a.date - b.date : b.date - a.date
  //   )
  //   setTasks(sortedTasks)
  // }

  // <Task
  //   taskTag={userName}
  //   taskTime={10:30}
  // />

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
              All
            </AsideBlock>
            <AsideBlock
              onClick={() => {
                handleButtonClick('date')
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
              active={doneButtonClick === 'all-inner'}
              type="button"
              backgroundColor={
                doneButtonClick === 'all-inner' ? 'rgba(147, 51, 234, 0.2)' : ''
              }
              onClick={() => {
                handleDoneClick('all-inner')
              }}
            >
              <AsideBlockImage src="purpleCircle.svg"></AsideBlockImage> All
            </CommunistAsideBlock>
            <CommunistAsideBlock
              active={doneButtonClick === 'done'}
              type="button"
              backgroundColor={
                doneButtonClick === 'done' ? 'rgba(147, 51, 234, 0.2)' : ''
              }
              onClick={() => {
                handleDoneClick('done')
              }}
            >
              <AsideBlockImage src="purpleCircle.svg"></AsideBlockImage> Done
            </CommunistAsideBlock>
            <CommunistAsideBlock
              active={doneButtonClick === 'undone'}
              type="button"
              backgroundColor={
                doneButtonClick === 'undone' ? 'rgba(147, 51, 234, 0.2)' : ''
              }
              onClick={() => {
                handleDoneClick('undone')
              }}
            >
              <AsideBlockImage src="purpleCircle.svg"></AsideBlockImage> Undone
            </CommunistAsideBlock>
          </CommunistAsideList>
          <AsideBlockTask
            onClick={() => {
              toggleModal('create')
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
              taskDate={task.date}
              taskTag={task.name}
              toggleModal={toggleModal}
            ></Task>
          ))}
        </BottomBlockContainer>
      </BottomContainer>
      {returnModal()}
    </ToDoContainer>
  )
}
