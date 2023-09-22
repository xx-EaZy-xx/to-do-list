import styled from 'styled-components'

export const ToDoContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const TopContainer = styled.section`
  display: flex;
  flex-direction: row;
  padding: 3px 16px 3px 16px;
  background-color: white;
  min-width: 640px;
  max-width: 672px;
  min-height: 44px;
  justify-content: space-between;
  border-radius: 10px;
  margin: auto 90px 31px auto;
  align-items: center;
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
`

export const BottomContainer = styled.div`
  max-width: 672px;
  max-height: 312px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

export const BottomBlockContainer = styled.div`
  min-width: 466px;
  background-color: white;
  border-radius: 10px;
  min-height: 312px;
`

export const AsideContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 16px;
  line-height: 18.75px;
  min-height: 312px;
`

export const AsideList = styled.div`
  display: flex;
  flex-direction: column;
`

export const AsideBlock = styled.button`
  display: flex;
  cursor: pointer;
  border: none;
  border-radius: 10px;
  color: ${(props) => (props.active ? 'rgba(147, 51, 234, 1)' : 'grey')};
  background-color: ${(props) =>
    props.active ? 'rgba(147, 51, 234, 0.06)' : 'transparent'};
  margin-bottom: 10px;
  display: ${(props) => props.display};
  min-width: 185px;
  min-height: 40px;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  transition: 0.1s;

  &:hover {
    transition: 0.1s;
    background-color: rgba(85, 85, 85, 0.2);
    opacity: 0.8;
  }

  &:active {
    transition: 0.1s;
    background-color: rgba(147, 51, 234, 0.3);
    color: rgba(147, 51, 234, 1);
  }
`

export const CommunistAsideList = styled.div`
  display: flex;
  flex-direction: column;
  border: none;
  border-radius: 10px;
  background-color: rgba(147, 51, 234, 0.06);
  color: rgba(147, 51, 234, 1);
  min-width: 185px;
  min-height: 40px;
  align-items: center;
  transition: 0.1s;
  display: ${(props) => props.display};
  flex-direction: column;
`

export const CommunistAsideBlock = styled(AsideBlock)`
  background: transparent;
  margin: 0;
  background-color: ${(props) => props.backgroundColor};
`

export const AsideBlock_active = styled(AsideBlock)`
  background-color: rgba(147, 51, 234, 0.06);
  color: rgba(147, 51, 234, 1);

  &:hover {
    transition: 0.1s;
    background-color: rgba(146, 51, 234, 0.3);
    opacity: 0.8;
  }

  &:active {
    transition: 0.1s;
    background-color: rgba(146, 51, 234, 0.6);
  }
`

export const AsideBlockTask = styled(AsideBlock_active)`
  margin: 0 auto;
`
export const AsideBlockTaskInnerBox = styled.div`
  margin: auto;
  display: flex;
`

export const AsideBlockImage = styled.img`
  max-height: 20px;
  margin: 0 12px 0 14px;
`

export const AsideBlockImageCentered = styled(AsideBlockImage)`
  margin: 0;
  margin-right: 12px;
`
