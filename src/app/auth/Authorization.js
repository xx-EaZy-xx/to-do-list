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

  async function handleRegister() {
    try {
      const { login, email, password, secondPassword } = authInput
      await apiRegister(login, email, password, secondPassword)
      setLoggedIn(true)
    } catch (err) {
      console.log(err.message)
    }
  }

  async function handleLogin() {
    try {
      const { login, password } = authInput
      const token = await apiLogin(login, password)
      localStorage.setItem('jwt', token.data)
      setLoggedIn(true)
    } catch (err) {
      console.log(err.message)
    }
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
          type="text"
          id="login"
          onChange={handleInputChange}
          placeholder="Enter login..."
        />
        {authState ? (
          ''
        ) : (
          <AuthInput
            type="text"
            id="email"
            onChange={handleInputChange}
            placeholder="Enter email..."
          />
        )}
        <AuthInput
          type="password"
          id="password"
          onChange={handleInputChange}
          placeholder="Enter password..."
        />
        {authState ? (
          ''
        ) : (
          <AuthInput
            type="password"
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
