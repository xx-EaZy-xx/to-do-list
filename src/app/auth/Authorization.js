import React, { useState, useEffect } from 'react'
import { redirect } from 'next/navigation'
import { apiRegister, apiLogin } from '../services/UserApi'
import {
  AuthContainer,
  AuthInnerContainer,
  AuthHeader,
  AuthInput,
  AuthSignUpButton,
  AuthSignContainer,
  AuthSignInnerContainer,
  AuthSignImage,
  AuthSignText,
  AuthValidationMessage,
} from './Authorization.styled'

export default function Authorization() {
  const [authState, setAuthState] = useState(true) //true = login && false = register
  const [loggedIn, setLoggedIn] = useState(false)
  const [authInput, setAuthInput] = useState({
    login: '',
    email: '',
    password: '',
    secondPassword: '',
  })
  const [valMessage, setValMessage] = useState('')
  //Обработчик инпутов
  function handleInputChange(e) {
    setAuthInput({
      login: e.target.id === 'login' ? e.target.value : authInput.login,
      email: e.target.id === 'email' ? e.target.value : authInput.email,
      password:
        e.target.id === 'password' ? e.target.value : authInput.password,
      secondPassword:
        e.target.id === 'secondPassword'
          ? e.target.value
          : authInput.secondPassword,
    })
  }

  function handleKeyDown() {
    authState ? handleLogin() : handleRegister()
  }

  //Тогглер login/register
  function toggleAuthState() {
    setAuthState(!authState)
  }

  async function handleRegister() {
    try {
      const { login, email, password, secondPassword } = authInput
      const reg = await apiRegister(login, email, password, secondPassword)
      reg ? handleLogin() : ''
    } catch (err) {
      console.log(err.message)
      setValMessage("User with such credentials can't be created!")
    }
  }

  async function handleLogin() {
    try {
      const { login, password } = authInput
      const auth = await apiLogin(login, password)
      localStorage.setItem('jwt', auth.data.token)
      localStorage.setItem('userId', auth.data.userId)
      localStorage.setItem('userName', auth.data.userName)
      setLoggedIn(true)
    } catch (err) {
      console.log(err.message)
      setValMessage('Invalid user credentials!')
    }
  }

  //Редирект по факту авторизации
  useEffect(() => {
    if (loggedIn) {
      redirect('/tasks', 'push')
    }
  }, [loggedIn])
  useEffect(() => {
    setValMessage('')
  }, [authState])
  return (
    <AuthContainer>
      <AuthInnerContainer>
        <AuthHeader>{authState ? 'Log in' : 'Sign up'}</AuthHeader>
        <AuthValidationMessage>{valMessage}</AuthValidationMessage>
        <AuthInput
          type="text"
          id="login"
          onChange={handleInputChange}
          placeholder="Enter login..."
          onKeyDown={(e) => {
            e.code === 'Enter' ? handleKeyDown() : ''
          }}
        />
        {authState ? (
          ''
        ) : (
          <AuthInput
            type="text"
            id="email"
            onChange={handleInputChange}
            placeholder="Enter email..."
            onKeyDown={(e) => {
              e.code === 'Enter' ? handleKeyDown() : ''
            }}
          />
        )}
        <AuthInput
          type="password"
          id="password"
          onChange={handleInputChange}
          placeholder="Enter password..."
          onKeyDown={(e) => {
            e.code === 'Enter' ? handleKeyDown() : ''
          }}
        />
        {authState ? (
          ''
        ) : (
          <AuthInput
            type="password"
            id="secondPassword"
            onChange={handleInputChange}
            placeholder="Enter password..."
            onKeyDown={(e) => {
              e.code === 'Enter' ? handleKeyDown() : ''
            }}
          />
        )}
        <AuthSignUpButton onClick={toggleAuthState}>
          {authState ? 'Sign up' : 'Sign in'}
        </AuthSignUpButton>
        <AuthSignContainer>
          <AuthSignInnerContainer
            onClick={authState ? handleLogin : handleRegister}
          >
            <AuthSignImage src="authArrow.svg" />
            <AuthSignText>{authState ? 'Sign in' : 'Sign up'}</AuthSignText>
          </AuthSignInnerContainer>
        </AuthSignContainer>
      </AuthInnerContainer>
    </AuthContainer>
  )
}
