import React, { useState } from 'react'
import {
  TopContainer,
  ToDoCell,
  UserNameCell,
  CellImage,
} from './Header.styled'

export default function Header() {
  const [userName] = useState('XxX_Oleg_XxX')
  return (
    <TopContainer>
      <ToDoCell>To-Do</ToDoCell>
      <UserNameCell>{userName}</UserNameCell>
      <CellImage src="profile.svg"></CellImage>
    </TopContainer>
  )
}
