'use client'
import React, { useEffect } from 'react'
import { redirect } from 'next/navigation'
import { PrimeContainer, Container } from './tasks/page.styled'
import Title from '../common/components/Title/Title'
import Header from '../common/components/Header/Header'
import ToDo from '../common/components/ToDo/ToDo'

export default function Home() {
  useEffect(() => {
    //Пытаюсь сделать защищённый роут
    const user = localStorage.getItem('userId')
    const jwt = localStorage.getItem('jwt')
    if (!(user || jwt)) redirect('/auth', 'push')
  }, [])
  return (
    <PrimeContainer>
      <Title />
      <Container>
        <Header />
        <ToDo />
      </Container>
    </PrimeContainer>
  )
}
