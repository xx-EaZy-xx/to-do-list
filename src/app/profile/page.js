'use client'
import React from 'react'
import { PrimeContainer, Container } from '../tasks/page.styled'
import Title from '../../common/components/Title/Title'
import Header from '../../common/components/Header/Header'
import Profile from '../../common/components/Profile/Profile'
export default function Page() {
  return (
    <PrimeContainer>
      <Title />
      <Container>
        <Header />
        <Profile />
      </Container>
    </PrimeContainer>
  )
}
