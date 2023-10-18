import React, { useState, useEffect } from 'react'
import {
  ProfileMainContainer,
  ProfileInnerContainer,
  ProfileBlockContainer,
  ProfileAsideContainer,
  ProfileAsideList,
  ProfileAsideBlock,
  ProfileAsideBlockImage,
  ProfileInput,
  ProfileSignContainer,
  ProfileSignInnerContainer,
  ProfileSignImage,
  ProfileSignText,
  ProfileHeader,
  ProfileInputContainer,
} from './Profile.styled'

export default function Profile() {
  return (
    <ProfileMainContainer>
      <ProfileAsideContainer>
        <ProfileAsideList>
          <ProfileAsideBlock>
            <ProfileAsideBlockImage src="profile.svg"></ProfileAsideBlockImage>
            Profile
          </ProfileAsideBlock>
          <ProfileAsideBlock active={true}>
            <ProfileAsideBlockImage src="solidShield.svg"></ProfileAsideBlockImage>
            Security
          </ProfileAsideBlock>
        </ProfileAsideList>
        <ProfileAsideBlock active={true}>
          <ProfileAsideBlockImage src="inversedAuthArrow.svg"></ProfileAsideBlockImage>
          Log Out
        </ProfileAsideBlock>
      </ProfileAsideContainer>
      <ProfileBlockContainer>
        <ProfileInnerContainer>
          <ProfileHeader>Edit password</ProfileHeader>
          <ProfileInputContainer>
            <ProfileInput placeholder="Enter new password" />
            <ProfileInput placeholder="Confirm password" />
          </ProfileInputContainer>
        </ProfileInnerContainer>
        <ProfileSignContainer>
          <ProfileSignInnerContainer>
            <ProfileSignImage src="doneShield.svg" />
            <ProfileSignText>Change password</ProfileSignText>
          </ProfileSignInnerContainer>
        </ProfileSignContainer>
      </ProfileBlockContainer>
    </ProfileMainContainer>
  )
}
