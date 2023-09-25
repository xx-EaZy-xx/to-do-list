import React, { useState, useEffect } from 'react';
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
} from './ToDoStyles';
import Task from '../Task/Task';
import ModalWindow from '../ModalWindow/ModalWindow';

export default function ToDo() {
  //Имя пользователя
  const [userName, setUserName] = useState('UserName');
  //Массив тасок
  const [tasks, setTasks] = useState([
    {
      name: 'fuck1',
      date: `1695660611586`,
      done: false,
    },
    {
      name: 'fuck2',
      date: `1695660711586`,
      done: false,
    },
  ]);

  const [inputValue, setInputValue] = useState('');
  //Модальные окна
  const [modalIsOpen, setModalIsOpen] = useState(false);

  //Боковые кнопки
  const [buttonClick, setButtonClick] = useState('today');
  const [doneButtonClick, setDoneButtonClick] = useState('all-inner');

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
    setInputValue(e.target.value);
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
        addTask={newAddTask}
      />
    ),
    delete: (
      <ModalWindow
        $isOpen={modalIsOpen}
        isToggled={toggleModal}
        overlayClick={handleOverlayClose}
        onEscPress={handleEscClose}
        poly={'delete'}
      />
    ),
  };
  function toggleModal(arg) {
    setModalIsOpen(arg);
  }
  const returnModal = () => {
    if (modalIsOpen === 'create') {
      return modals.create;
    } else if (modalIsOpen === 'delete') {
      return modals.delete;
    } else {
      return;
    }
  };
  function handleOverlayClose(e) {
    if (e.target === e.currentTarget) {
      toggleModal();
    }
  }
  function handleEscClose({ key }) {
    switch (key) {
      case 'Escape':
        toggleModal();
      case 'Enter':
        newAddTask(inputValue);
        break;
    }
  }

  //Нажатие кнопок
  const handleButtonClick = (button) => {
    setButtonClick(button);
    if (buttonClick === 'all') {
      setButtonClick('today');
      setDoneButtonClick(localStorage.getItem('doneButton'));
    }
  };

  const handleDoneClick = (button) => {
    setDoneButtonClick(button);
    localStorage.setItem('doneButton', doneButtonClick);
  };

  //Добавление новых задач
  function newAddTask(name) {
    const newTasks = [
      ...tasks,
      {
        name: name,
        date: +Date.now(),
        done: false,
      },
    ];
    setTasks(newTasks);
    console.log(tasks);
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
                handleButtonClick('today');
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
                handleButtonClick('all');
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
                handleButtonClick('date');
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
                handleDoneClick('all-inner');
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
                handleDoneClick('done');
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
                handleDoneClick('undone');
              }}
            >
              <AsideBlockImage src="purpleCircle.svg"></AsideBlockImage> Undone
            </CommunistAsideBlock>
          </CommunistAsideList>
          <AsideBlockTask
            onClick={() => {
              toggleModal('create');
            }}
          >
            <AsideBlockTaskInnerBox>
              <AsideBlockImageCentered src="addTask.svg"></AsideBlockImageCentered>{' '}
              Add Task
            </AsideBlockTaskInnerBox>
          </AsideBlockTask>
        </AsideContainer>
        <BottomBlockContainer>
          {tasks.map((task) => (
            <Task
              key={task.date}
              taskTag={task.name}
              taskIsDone={task.done}
              toggleModal={toggleModal}
            ></Task>
          ))}
        </BottomBlockContainer>
      </BottomContainer>
      {returnModal()}
    </ToDoContainer>
  );
}
