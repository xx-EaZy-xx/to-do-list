import React, { useState, useEffect } from 'react'
import { redirect } from 'next/navigation'
import { Api } from '../utils/MainApi'
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
  const [authState, setAuthState] = useState(true)
  const [loggedIn, setLoggedIn] = useState(false)

  function handleLoggedState() {
    setLoggedIn(!loggedIn)
  }

  function handleAuthState() {
    setAuthState(!authState)
  }

  //Редирект по факту авторизации
  useEffect(() => {
    if (loggedIn) {
      redirect('/', 'push')
    }
  }, [loggedIn])
  return (
    <AuthContainer>
      <AuthInnerContainer>
        <AuthHeader>{authState ? 'Log in' : 'Sign up'}</AuthHeader>
        <AuthInput placeholder="Enter login..." />
        {authState ? '' : <AuthInput placeholder="Enter email..." />}
        <AuthInput placeholder="Enter password..." />
        {authState ? '' : <AuthInput placeholder="Enter password..." />}
        <AuthSignUpButton onClick={handleAuthState}>
          {authState ? 'Sign up' : 'Sign in'}
        </AuthSignUpButton>
        <AuthSignContainer>
          <AuthSignInnerContainer onClick={handleLoggedState}>
            <AuthSignImage src="authArrow.svg" />
            <AuthSignText>{authState ? 'Sign in' : 'Sign up'}</AuthSignText>
          </AuthSignInnerContainer>
        </AuthSignContainer>
      </AuthInnerContainer>
    </AuthContainer>
  )
}
