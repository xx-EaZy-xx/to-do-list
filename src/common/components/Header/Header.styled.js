import styled from 'styled-components'

export const TopContainer = styled.section`
  display: flex;
  flex-direction: row;
  padding: 3px 16px 3px 16px;
  background-color: white;
  width: 735px;
  min-height: 44px;
  justify-content: space-between;
  border-radius: 10px;
  margin: auto auto 31px auto;
  align-items: center;

  @media (max-width: 1268px) {
    margin: 0 0 16px 0;
  }
`

export const ToDoCell = styled.div`
  color: #9333ea;
  font-size: 20px;
  font-weight: bold;
  line-height: 23px;
`

export const UserNameCell = styled(ToDoCell)`
  font-size: 16px;
  font-weight: normal;
  line-height: 18.75px;
`

export const CellImage = styled.img`
  width: 16px;
  height: 16px;
  contain: cover;
  border: none;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`
