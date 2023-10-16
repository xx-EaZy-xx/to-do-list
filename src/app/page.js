'use client'
import { PrimeContainer, Container } from './page.styled'
import Title from './common/components/Title/Title'
import Header from './common/components/Header/Header'
import ToDo from './common/components/ToDo/ToDo'

export default function Home() {
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
