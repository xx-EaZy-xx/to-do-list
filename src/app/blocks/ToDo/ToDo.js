import React, { useState } from 'react'
import Modal from 'react-modal'
import { ModalProvider } from 'styled-react-modal'
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
  AsideBlock_active,
  AsideBlockTask,
  AsideBlockTaskInnerBox,
  AsideBlockImage,
  AsideBlockImageCentered,
  BottomBlockContainer,
  CommunistAsideList,
  CommunistAsideBlock,
} from './ToDoStyles'
import {
  ModalContainer,
  CloseButton,
  ModalHeader,
  ModalBox,
  ModalInput,
  SaveButton,
  ModalLittleBox,
  ModalSigns,
} from '../ModalWindow/ModalWindowStyles'
import Task from '../Task/Task'

export default function ToDo() {
  const [userName, setUserName] = useState('UserName')
  //Кнопки слева от списка дел
  const [todayIsClicked, setTodayIsClicked] = useState(true)
  const [allIsClicked, setAllIsClicked] = useState(false)
  const [allIsClickedInner, setAllIsClickedInner] = useState(allIsClicked)
  const [arrowsIsClicked, setArrowsIsClicked] = useState(false)
  const [arrowsIsVisible, setArrowsIsVisible] = useState('flex')
  const [taskListIsVisible, setTaskListIsVisible] = useState('none')
  // Всплывающие кнопки
  const backgroundColor = 'rgba(147, 51, 234, 0.2)'
  const [firstButton, setFirstButton] = useState('none')
  const [secondButton, setSecondButton] = useState('none')
  const [thirdButton, setThirdButton] = useState('none')

  //Контроллируемый инпут
  const [inputValue, setInputValue] = useState('')
  const [tasks, setTasks] = useState([])

  //Модальное окно
  Modal.setAppElement('#modal')
  const [modalIsOpen, setModalIsOpen] = useState(false)
  function toggleModal() {
    setModalIsOpen(!modalIsOpen)
  }

  // const [isModalOpen, setIsModalOpen] = useState('delete')
  // const toggle = (data) = > setIsModalOpen(data)

  // const [test, setTest] = useState({
  //   dataSort: 'asc',
  //   filter: 'all',
  //   today: false,
  // })

  // const modals =
  //   {
  //     edit:<EditModal/>,
  //     create:<EditModal/>,
  //     delete:<EditModal/>,
  //   }

  // <ModalWrapper $isVisible={!!isModalOpen} children={modals.isModalOpen} />

  // useEffect(() => {
  // handleTasks()
  // }, [tasks,test])

  // const handleTasks = () =>{
  //   let sortedTasks = [...tasks]
  //   if (status !== 'all') {
  //     oldTasks = oldTasks.filter((task) =>
  //       status === ' done' ? task.done === true : task.done === false
  //     )
  //   }
  //   if (today) tasks.filter((task) => task.date <= today)
  //   oldTasks.sort((a, b) =>
  //     date === 'asc' ? a.date -   b.date : b.date - a.date
  //   )
  // setTasks(sortedTasks)
  // }

  //Кнопки слева от списка дел
  function handleTodayClick() {
    setTodayIsClicked(true)
    setAllIsClicked(false)
    setArrowsIsClicked(false)
    setArrowsIsVisible('flex')
    setTaskListIsVisible('none')
  }
  function handleVisibility(arg) {
    if (arg === 'flex') {
      return 'none'
    } else {
      return 'flex'
    }
  }
  function handleAllClick() {
    setTodayIsClicked(false)
    setAllIsClicked(true)
    setAllIsClickedInner(!allIsClickedInner)
    setArrowsIsClicked(false)
    setArrowsIsVisible(handleVisibility(arrowsIsVisible))
    setTaskListIsVisible(handleVisibility(taskListIsVisible))
  }
  function handleArrowsClick() {
    setTodayIsClicked(false)
    setAllIsClicked(false)
    setArrowsIsClicked(true)
  }

  // Всплывающие кнопки
  function handleFirstButtonClick() {
    setFirstButton(backgroundColor)
    setSecondButton('none')
    setThirdButton('none')
  }
  function handleSecondButtonClick() {
    setFirstButton('none')
    setSecondButton(backgroundColor)
    setThirdButton('none')
  }
  function handleThirdButtonClick() {
    setFirstButton('none')
    setSecondButton('none')
    setThirdButton(backgroundColor)
  }

  //Добавление новых задач

  function handleInputChange(e) {
    setInputValue(e.target.value)
  }

  function handleFormSubmit(e) {
    e.preventDefault()
    const date = new Date()
    if (inputValue !== '' && tasks.length <= 10) {
      const task = (
        <Task
          key={Math.random()}
          deleteTask={() => setTasks(tasks.filter((el) => el.key !== task.key))}
          taskTag={inputValue}
          taskTime={`${date.getDate()} ${date.getMinutes()}`}
        />
      )
      console.log(tasks.map((el) => el))
      setTasks([...tasks, task])
      function deleteTask() {
        tasks.filter((el) => {
          console.log(el)
        })
      }
    } else {
      if (inputValue.length === 0) {
        alert
      }
      return
    }
  }

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
              onClick={handleTodayClick}
              active={todayIsClicked}
              type="button"
            >
              <AsideBlockImage
                src={todayIsClicked ? 'calendar.svg' : 'greyCalendar.svg'}
              ></AsideBlockImage>{' '}
              Today
            </AsideBlock>
            <AsideBlock
              onClick={handleAllClick}
              active={allIsClicked}
              type="button"
            >
              <AsideBlockImage
                src={allIsClicked ? 'purpleCircle.svg' : 'doneSolid.svg'}
              ></AsideBlockImage>{' '}
              {allIsClickedInner ? 'Done' : 'All'}
            </AsideBlock>
            <AsideBlock
              onClick={handleArrowsClick}
              active={arrowsIsClicked}
              display={`${arrowsIsVisible}`}
            >
              <AsideBlockImage
                src={arrowsIsClicked ? 'arrowsPurple.svg' : 'arrows.svg'}
              ></AsideBlockImage>
              Date
            </AsideBlock>
          </AsideList>
          <CommunistAsideList display={`${taskListIsVisible}`}>
            <CommunistAsideBlock
              active={allIsClicked}
              type="button"
              backgroundColor={firstButton}
              onClick={handleFirstButtonClick}
            >
              <AsideBlockImage src="purpleCircle.svg"></AsideBlockImage> All
            </CommunistAsideBlock>
            <CommunistAsideBlock
              active={allIsClicked}
              type="button"
              backgroundColor={secondButton}
              onClick={handleSecondButtonClick}
            >
              <AsideBlockImage src="purpleCircle.svg"></AsideBlockImage> Done
            </CommunistAsideBlock>
            <CommunistAsideBlock
              active={allIsClicked}
              type="button"
              backgroundColor={thirdButton}
              onClick={handleThirdButtonClick}
            >
              <AsideBlockImage src="purpleCircle.svg"></AsideBlockImage> Undone
            </CommunistAsideBlock>
          </CommunistAsideList>
          <AsideBlockTask onClick={toggleModal}>
            <AsideBlockTaskInnerBox>
              <AsideBlockImageCentered src="addTask.svg"></AsideBlockImageCentered>{' '}
              Add Task
            </AsideBlockTaskInnerBox>
          </AsideBlockTask>
        </AsideContainer>
        <BottomBlockContainer>{tasks}</BottomBlockContainer>
      </BottomContainer>
      <ModalProvider>
        <ModalContainer
          isOpen={modalIsOpen}
          onBackgroundClick={toggleModal}
          onEscapeKeydown={toggleModal}
        >
          <ModalHeader>Create task</ModalHeader>
          <form onSubmit={handleFormSubmit}>
            <ModalInput
              required
              maxLength={30}
              onChange={handleInputChange}
              placeholder="Enter text..."
            />
            <ModalBox>
              <ModalLittleBox type="submit">
                <ModalSigns alt="green circle" src="doneGreen.svg" />
                <SaveButton>Save</SaveButton>
              </ModalLittleBox>
              <ModalLittleBox onClick={toggleModal} type="reset">
                <ModalSigns alt="grey cross" src="cross.svg" />
                <CloseButton>Close</CloseButton>
              </ModalLittleBox>
            </ModalBox>
          </form>
        </ModalContainer>
      </ModalProvider>
    </ToDoContainer>
  )
}
