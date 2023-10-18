import React, { useState, useEffect } from 'react'
import { redirect } from 'next/navigation'
import {
  TopContainer,
  ToDoCell,
  UserNameCell,
  CellImage,
} from './Header.styled'

export default function Header() {
  const enterMessage = 'Start using the app now!'
  const [userName, setUserName] = useState(enterMessage)
  const [isLoggedIn, setIsLoggedIn] = useState(true)

  function handleLoggedIn() {
    setIsLoggedIn(!isLoggedIn)
  }

  useEffect(() => {
    if (isLoggedIn === false) {
      localStorage.removeItem('jwt')
      localStorage.removeItem('userId')
      localStorage.removeItem('userName')
      redirect('/auth', 'push')
    }
  }, [isLoggedIn])

  useEffect(() => {
    setUserName(localStorage.getItem('userName'))
  }, [])

  return (
    <TopContainer>
      <ToDoCell>To-Do</ToDoCell>
      <UserNameCell>{userName ?? enterMessage}</UserNameCell>
      <CellImage onClick={handleLoggedIn} src="profile.svg"></CellImage>
    </TopContainer>
  )
}
