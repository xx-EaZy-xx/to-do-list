import styled from 'styled-components'

export const ProfileMainContainer = styled.div`
  width: 100%;
  display: flex;
  gap: auto;
  flex-direction: row;
  justify-content: space-between;
`
export const ProfileInnerContainer = styled.div`
  min-width: 426px;
  max-width: fit-content;
  min-height: 312px;
  display: flex;
  flex-direction: column;
  margin: 0 auto 0 auto;
`

export const ProfileBlockContainer = styled.div`
  min-width: 540px;
  width: fit-content;
  background-color: white;
  border-radius: 10px;
  min-height: 312px;
  padding-bottom: 20px;
  padding-left: 0;
  padding-right: 0;
  list-style-type: none;
  margin: 0;
`

export const ProfileAsideContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 16px;
  line-height: 18.75px;
  max-width: 185px;
  min-height: 312px;
`

export const ProfileAsideList = styled.div`
  display: flex;
  flex-direction: column;
`

export const ProfileAsideBlock = styled.div`
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

export const ProfileAsideBlockImage = styled.img`
  max-height: 20px;
  margin: 0 12px 0 14px;
`

export const ProfileInput = styled.input`
  min-width: 426px;
  max-width: fit-content;
  height: 35px;
  border-radius: 6px;
  border: none;
  margin-left: auto;
  margin-right: auto;
  margin-top: 36px;
  font-size: 16px;
  background-color: rgba(243, 243, 243, 1);
  padding: 0 12px;

  &::placeholder {
    color: rgba(107, 114, 128, 1);
  }
`

export const ProfileSignUpButton = styled.button`
  color: rgba(147, 51, 234, 1);
  font-size: 16px;
  max-width: fit-content;
  background: transparent;
  border: none;
  cursor: pointer;
  margin-left: auto;
  margin-right: 0;
  margin-top: 6px;

  &:hover {
    color: rgba(173, 137, 206, 1);
  }
  &:active {
    color: rgba(147, 51, 234, 0.5);
  }
`

export const ProfileSignContainer = styled.button`
  width: 185px;
  height: 40px;
  background-color: rgba(147, 51, 234, 0.06);
  color: rgba(147, 51, 234, 1);
  font-size: 16px;
  display: flex;
  flex-direction: row;
  margin: auto auto auto auto;
  border-radius: 6px;
  cursor: pointer;
  border: none;

  &:hover {
    opacity: 0.7;
  }
  &:active {
    opacity: 0.9;
  }
`
export const ProfileSignInnerContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 auto;
`

export const ProfileSignImage = styled.img`
  width: 20px;
  height: 20px;
  align-self: center;
  contain: cover;
`

export const ProfileSignText = styled.p`
  margin: 0 0 0 4px;
  align-self: center;
`

export const ProfileHeader = styled.h3`
  color: rgba(64, 64, 64, 1);
  font-size: 20px;
  font-weight: bold;
  line-height: 23px;
  text-align: center;
  margin: 18px 0 0 0;
`

export const ProfileInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
`
