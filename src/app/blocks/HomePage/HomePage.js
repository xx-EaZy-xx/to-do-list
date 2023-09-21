import { PrimeContainer } from './HomePageStyles'
import ToDo from '../ToDo/ToDo'
import Title from '../Title/Title'

export default function Home() {
  return (
    <PrimeContainer>
      <Title />
      <ToDo />
    </PrimeContainer>
  )
}
