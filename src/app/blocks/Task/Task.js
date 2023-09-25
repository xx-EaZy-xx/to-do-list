import React, { useState } from 'react';
import {
  MainTaskBox,
  TaskBox,
  ButtonBox,
  TaskImage,
  TaskImageLeft,
  LittleBox,
  LittleBoxLeft,
  SupremeTaskBox,
} from './TaskStyles';
import TaskEdition from '../TaskEdition/TaskEdition';

export default function Task({ taskTag, taskDate, taskIsDone, toggleModal }) {
  const [isTaskPushed, setIsTaskPushed] = useState(false);
  const [isCheckPushed, setIsCheckPushed] = useState(false);

  function handleTaskPush() {
    setIsTaskPushed(!isTaskPushed);
  }

  function handleCheckPush() {
    setIsCheckPushed(!isCheckPushed);
  }

  return (
    <SupremeTaskBox>
      <MainTaskBox>
        <ButtonBox>
          <TaskImage
            onClick={handleCheckPush}
            src={isCheckPushed ? 'done.svg' : 'doneGrey.svg'}
            alt="кнопка завершить задачу - галочка"
          ></TaskImage>
        </ButtonBox>
        <TaskBox>
          <LittleBox>{taskTag}</LittleBox>
          <LittleBoxLeft>
            Today at {taskDate}
            <ButtonBox onClick={handleTaskPush}>
              <TaskImageLeft
                src="points.svg"
                alt="кнопка ещё - 3 точки"
              ></TaskImageLeft>
            </ButtonBox>
          </LittleBoxLeft>
        </TaskBox>
      </MainTaskBox>
      {isTaskPushed ? <TaskEdition toggleModal={toggleModal} /> : ''}
    </SupremeTaskBox>
  );
}
