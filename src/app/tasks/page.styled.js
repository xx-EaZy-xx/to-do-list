import '../../vendor/normalize.css'
import '../../vendor/fonts.css'
import styled from 'styled-components'

export const PrimeContainer = styled.main`
  display: flex;
  flex-direction: row;
  background: linear-gradient(to bottom right, #f6d1fc, #b9d5ff);
  width: 100vw;
  height: 100vh;
  max-height: 100vh;
  font-family: Roboto;
  font-size: 96px;
  font-family: 'Roboto', sans-serif;
  margin: auto;
  justify-content: space-evenly;
  align-items: center;

  @media (max-width: 1268px) {
    flex-direction: column;
  }
`
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  transition: transform 2s ease-in-out;
`
