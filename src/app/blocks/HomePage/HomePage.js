import { PrimeContainer } from './HomePageStyles'
import ToDo from '../ToDo/ToDo'
import Title from '../Title/Title'
import ModalWindow from '../ModalWindow/ModalWindow'

export default function Home() {
  return (
    <PrimeContainer>
      <ModalWindow />
      <Title />
      <ToDo />
    </PrimeContainer>
  )
}
