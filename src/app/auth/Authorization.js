import React, { useState, useEffect } from 'react'
import { redirect } from 'next/navigation'
import { register } from '../services/UserApi'
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

  //Простые хэндлеры
  function handleLoggedInState() {
    setLoggedIn(!loggedIn)
  }
  function handleAuthState() {
    setAuthState(!authState)
  }

  function handleRegister() {
    console.log('Register!', authInput)
    const { login, email, password, secondPassword } = authInput
    // register(login, email, password, secondPassword)
  }

  //Редирект по факту авторизации
  useEffect(() => {
    if (loggedIn) {
      redirect('/tasks', 'push')
    }
  }, [loggedIn])
  return (
    <AuthContainer>
      <AuthInnerContainer>
        <AuthHeader>{authState ? 'Log in' : 'Sign up'}</AuthHeader>
        <AuthInput
          id="login"
          onChange={handleInputChange}
          placeholder="Enter login..."
        />
        {authState ? (
          ''
        ) : (
          <AuthInput
            id="email"
            onChange={handleInputChange}
            placeholder="Enter email..."
          />
        )}
        <AuthInput
          id="password"
          onChange={handleInputChange}
          placeholder="Enter password..."
        />
        {authState ? (
          ''
        ) : (
          <AuthInput
            id="secondPassword"
            onChange={handleInputChange}
            placeholder="Enter password..."
          />
        )}
        <AuthSignUpButton onClick={handleAuthState}>
          {authState ? 'Sign up' : 'Sign in'}
        </AuthSignUpButton>
        <AuthSignContainer>
          <AuthSignInnerContainer
            onClick={authState ? handleLoggedInState : handleRegister}
          >
            <AuthSignImage src="authArrow.svg" />
            <AuthSignText>{authState ? 'Sign in' : 'Sign up'}</AuthSignText>
          </AuthSignInnerContainer>
        </AuthSignContainer>
      </AuthInnerContainer>
    </AuthContainer>
  )
}
