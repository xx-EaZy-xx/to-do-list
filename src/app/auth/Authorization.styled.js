import styled from 'styled-components'

export const AuthContainer = styled.div`
  min-width: 540px;
  width: fit-content;
  max-height: 466px;
  background-color: white;
  border-radius: 10px;
  min-height: 312px;
  padding-left: 0;
  padding-right: 0;
  list-style-type: none;
  margin: 0;
  margin: auto;
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;
`

export const AuthInnerContainer = styled.div`
  min-width: 426px;
  max-width: fit-content;
  min-height: 312px;
  display: flex;
  flex-direction: column;
  margin: 0 auto 0 auto;
  justify-content: space-between;
`

export const AuthHeader = styled.h3`
  color: #9333ea;
  font-size: 20px;
  font-weight: bold;
  line-height: 23px;
  text-align: center;
  margin: 18px 0 0 0;
`

export const AuthInput = styled.input`
  min-width: 426px;
  max-width: fit-content;
  height: 35px;
  border-radius: 6px;
  border: none;
  margin-left: auto;
  margin-right: auto;
  margin-top: 28px;
  font-size: 16px;
  background-color: rgba(243, 243, 243, 1);
  padding: 0 12px;

  &::placeholder {
    color: rgba(107, 114, 128, 1);
  }
`

export const AuthSignUpButton = styled.button`
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

export const AuthSignContainer = styled.button`
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
export const AuthSignInnerContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 auto;
`

export const AuthSignImage = styled.img`
  width: 20px;
  height: 20px;
  align-self: center;
  contain: cover;
`

export const AuthSignText = styled.p`
  margin: 0 0 0 4px;
  align-self: center;
`
