'use client'
import React from 'react'
import { PrimeContainer, Container } from '../page.styled'
import Title from '../common/components/Title/Title'
import Header from '../common/components/Header/Header'
import Authorization from './Authorization'

export default function Page() {
  return (
    <PrimeContainer>
      <Title />
      <Container>
        <Header />
        <Authorization />
      </Container>
    </PrimeContainer>
  )
}
