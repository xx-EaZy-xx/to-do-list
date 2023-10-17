import styled from 'styled-components'

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
`

export const Title = styled.h1`
  color: rgba(64, 64, 64);
  font-size: 96px;
  margin: auto auto auto 65px;
  height: fit-content;
  width: fit-content;
  font-weight: 700px;
  line-height: 112.5px;
  transition: 0.3s;
  &:hover {
    transition: 0.3s;
    transform: scale(1.15);
    text-shadow: 1px 1px 0 rgba(64, 64, 64, 0.1),
      1px 2px 0 rgba(64, 64, 64, 0.1), 1px 3px 0 rgba(64, 64, 64, 0.1),
      1px 4px 0 rgba(64, 64, 64, 0.1), 1px 5px 0 rgba(64, 64, 64, 0.1),
      1px 6px 0 rgba(64, 64, 64, 0.1), 1px 7px 0 rgba(64, 64, 64, 0.1),
      1px 8px 0 rgba(64, 64, 64, 0.1), 5px 13px 15px rgba(64, 64, 64, 0.1);
  }
  @media (max-width: 1268px) {
    margin-left: 0;
    font-size: 76px;
  }
`

export const TitlePurple = styled(Title)`
  color: #9333ea;
  margin: auto;
  &:hover {
    transition: 0.3s;
    transform: scale(1.3);
    text-shadow: 1px 1px 0 rgba(146, 51, 234, 0.1),
      1px 2px 0 rgba(146, 51, 234, 0.1), 1px 3px 0 rgba(146, 51, 234, 0.1),
      1px 4px 0 rgba(146, 51, 234, 0.1), 1px 5px 0 rgba(146, 51, 234, 0.1),
      1px 6px 0 rgba(146, 51, 234, 0.1), 1px 7px 0 rgba(146, 51, 234, 0.1),
      1px 8px 0 rgba(146, 51, 234, 0.1), 5px 13px 15px rgba(146, 51, 234, 0.1);
  }
`
