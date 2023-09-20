import "../../../vendor/normalize.css";
import "../../../vendor/fonts.css";
import styled from "styled-components";

export const PrimeContainer = styled.main`
  display: flex;
  flex-direction: row;
  background: linear-gradient(to bottom right, #f6d1fc, #b9d5ff);
  width: 100vw;
  height: 100vh;
  max-height: 100vh;
  font-family: Roboto;
  font-size: 96px;
  font-family: "Roboto", sans-serif;
  margin: auto;
  justify-content: space-evenly;
  align-items: center;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const TitleContainer__Title = styled.h1`
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
`;

export const TitleContainer__Title_Purple = styled(TitleContainer__Title)`
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
`;

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
`;

export const TopContainer__CellToDo = styled.div`
  color: #9333ea;
  font-size: 20px;
  font-weight: bold;
  line-height: 23px;
`;

export const TopContainer__CellUserName = styled(TopContainer__CellToDo)`
  font-size: 16px;
  font-weight: normal;
  line-height: 18.75px;
`;

export const ToDoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TopContainer__CellImage = styled.img`
  width: 16px;
  height: 16px;
  contain: cover;
`;

export const BottomContainer = styled.div`
  max-width: 672px;
  max-height: 312px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const BottomContainer__AsideContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 16px;
  line-height: 18.75px;
  min-height: 312px;
`;

export const BottomContainer__AsideContainer_List = styled.div`
  display: flex;
  flex-direction: column;
`;

export const BottomContainer__AsideContainer_Block = styled(
  BottomContainer__AsideContainer_List
)`
  cursor: pointer;
  border-radius: 10px;
  color: grey;
  margin-bottom: 10px;
  min-width: 185px;
  min-height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  transition: 0.1s;

  &:hover {
    transition: 0.1s;
    background-color: rgba(85, 85, 85, 0.2);
    opacity: 0.8;
  }
`;

export const BottomContainer__AsideContainer_Block_active = styled(
  BottomContainer__AsideContainer_Block
)`
  background-color: rgba(147, 51, 234, 0.06);
  color: #9333ea;

  &:hover {
    transition: 0.1s;
    background-color: rgba(146, 51, 234, 0.3);
    opacity: 0.8;
  }
`;

export const BottomContainer__AsideContainer_Block_Task = styled(
  BottomContainer__AsideContainer_Block_active
)`
  margin: 0 auto;
`;
export const BottomContainer__AsideContainer_Block_Task_innerBox = styled.div`
  margin: auto;
  display: flex;
`;

export const BottomContainer__AsideContainer_Block_Image = styled.img`
  max-height: 20px;
  margin: 0 12px 0 14px;
`;

export const BottomContainer__AsideContainer_Block_Image_centered = styled(
  BottomContainer__AsideContainer_Block_Image
)`
  margin: 0;
  margin-right: 12px;
`;

export const BottomContainer__BlockContainer = styled.div`
  min-width: 466px;
  background-color: white;
  border-radius: 10px;
  min-height: 312px;
`;

export const BottomContainer__BlockContainer_SubContainer = styled(
  BottomContainer__BlockContainer
)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  min-width: max-content;
  background-color: rgba(147, 51, 234, 0.06);
  border-radius: 10px;
  max-width: 428px;
  min-height: 0;
  height: 33px;
  margin: 0 auto 7px auto;
  font-size: 16px;
  align-items: center;
  transition: 0.3s;

  &:first-of-type {
    margin-top: 31px;
  }

  &:hover {
    background-color: rgba(146, 51, 234, 0.135);
    transition: 0.3s;
  }
`;

export const BottomContainer__BlockContainer_SubContainer_Box = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: auto 16px;
`;

export const BottomContainer__BlockContainer_SubContainer_Box_image = styled.img`
  width: 18px;
  height: 18px;
  contain: cover;
  align-self: center;
  margin-right: 20px;
  transition: 0.3s;
  cursor: pointer;

  &:hover {
    opacity: 0.6;
    transition: 0.3s;
  }
`;

export const BottomContainer__BlockContainer_SubContainer_Box_image_left = styled.img`
  margin-right: 0;
  margin-left: 4px;
  cursor: pointer;

  &:hover {
    opacity: 0.6;
    transition: 0.3s;
  }
`;

export const BottomContainer__BlockContainer_SubContainer_Box_left = styled(
  BottomContainer__BlockContainer_SubContainer_Box
)`
  color: rgb(107, 114, 128);
  font-size: 14px;
`;

export const BottomContainer__BlockContainer_SubContainer_Box_Edition = styled.div`
  border: 1px solid rgba(125, 64, 255, 1);
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  min-width: 53px;
  max-width: 53px;
  height: 24px;
  margin: 0 22px 14px auto;

  &:nth-last-of-type(1) {
    margin-bottom: 0;
  }
`;
export const BottomContainer__BlockContainer_SubContainer_Box_Edition_image = styled.img`
  width: 18px;
  height: 15px;
  cursor: pointer;
  transition: 0.1s;

  &:hover {
    transition: 0.1s;
    opacity: 0.6;
  }
`;
