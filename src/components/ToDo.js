import React, { useState } from "react";
import * as styles from "../app/styles/blocks/styles";
import Task from "../components/Task";
import TaskEdition from "../components/TaskEdition";

export default function ToDo({}) {
  const [taskName, setTaskName] = useState("Task 1");

  return (
    <styles.ToDoContainer>
      <styles.TopContainer>
        <styles.TopContainer__CellToDo>To-Do</styles.TopContainer__CellToDo>
        <styles.TopContainer__CellUserName>
          UserName
        </styles.TopContainer__CellUserName>
        <styles.TopContainer__CellImage src="profile.svg"></styles.TopContainer__CellImage>
      </styles.TopContainer>
      <styles.BottomContainer>
        <styles.BottomContainer__AsideContainer>
          <styles.BottomContainer__AsideContainer_List>
            <styles.BottomContainer__AsideContainer_Block_active>
              <styles.BottomContainer__AsideContainer_Block_Image src="calendar.svg"></styles.BottomContainer__AsideContainer_Block_Image>{" "}
              Today
            </styles.BottomContainer__AsideContainer_Block_active>
            <styles.BottomContainer__AsideContainer_Block>
              <styles.BottomContainer__AsideContainer_Block_Image src="doneSolid.svg"></styles.BottomContainer__AsideContainer_Block_Image>{" "}
              All
            </styles.BottomContainer__AsideContainer_Block>
            <styles.BottomContainer__AsideContainer_Block>
              <styles.BottomContainer__AsideContainer_Block_Image src="arrows.svg"></styles.BottomContainer__AsideContainer_Block_Image>{" "}
              Date
            </styles.BottomContainer__AsideContainer_Block>
          </styles.BottomContainer__AsideContainer_List>
          <styles.BottomContainer__AsideContainer_Block_Task>
            <styles.BottomContainer__AsideContainer_Block_Task_innerBox>
              <styles.BottomContainer__AsideContainer_Block_Image_centered src="addTask.svg"></styles.BottomContainer__AsideContainer_Block_Image_centered>{" "}
              Add Task
            </styles.BottomContainer__AsideContainer_Block_Task_innerBox>
          </styles.BottomContainer__AsideContainer_Block_Task>
        </styles.BottomContainer__AsideContainer>
        <styles.BottomContainer__BlockContainer>
          <Task taskState={true} taskTag={taskName} />
          <Task taskState={false} taskTag={taskName} />
          <Task taskState={false} taskTag={taskName} />
          <TaskEdition />
        </styles.BottomContainer__BlockContainer>
      </styles.BottomContainer>
    </styles.ToDoContainer>
  );
}
