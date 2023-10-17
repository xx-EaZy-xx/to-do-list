import React, { useState, useEffect } from 'react'
import { getTasks, eraseTask } from '../../../app/services/TaskApi'
import {
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
  //Данные пользователя
  const [userName] = useState('XxX_Oleg_XxX')
  const [loggedIn, setLoggedIn] = useState(false)
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
      Math.ceil(totalTasks / tasksPerPage)
      handleButtonPush({ todayStatus: 'any' })
    } else if (button.todayStatus === 'any') {
      handleButtonPush({ todayStatus: 'today' })
    }
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
  async function deleteTask(taskId) {
    try {
      await eraseTask(taskId)
      handleFetch()
    } catch (err) {
      console.log(err)
    }
  }
  //Запросы с сервера
  function handleFetch() {
    setTimeToFetch(!timeToFetch)
  }

  useEffect(() => {
    //запрос к api
    ;(async () => {
      try {
        const fetchedTasks = await getTasks(
          page,
          button.drop,
          button.vectorStatus,
          button.todayStatus
        )
        if (fetchedTasks?.data) {
          const { count, rows } = fetchedTasks.data
          setTasks(rows)
          setTotalTasks(count)
          //Возврат на предыдущую страницу, если данная страница пуста
          rows.length === 0 && page > 1 ? setPage(page - 1) : ''
        }
      } catch (err) {
        console.log(err)
      }
    })()
  }, [timeToFetch, page])
  return (
    <>
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
      {totalTasks <= tasksPerPage ? (
        ''
      ) : (
        <Pagination
          tasksPerPage={tasksPerPage}
          totalTasks={totalTasks}
          setPage={setPage}
          page={page}
        />
      )}
    </>
  )
}
