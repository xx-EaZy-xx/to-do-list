import React, { useState } from "react";
import * as styles from "../app/styles/blocks/styles";

export default function Task({taskState, taskTag}) {
  const [taskTime, setTaskTime] = useState("18:30");

  return (
    <styles.BottomContainer__BlockContainer_SubContainer>
      <styles.BottomContainer__BlockContainer_SubContainer_Box>
        <styles.BottomContainer__BlockContainer_SubContainer_Box_image
          src={taskState ? "done.svg" : "donegrey.svg"}
        ></styles.BottomContainer__BlockContainer_SubContainer_Box_image>
        Task 1
      </styles.BottomContainer__BlockContainer_SubContainer_Box>
      <styles.BottomContainer__BlockContainer_SubContainer_Box_left>
        Today at {taskTime}
        <styles.BottomContainer__BlockContainer_SubContainer_Box_image_left src="points.svg"></styles.BottomContainer__BlockContainer_SubContainer_Box_image_left>
      </styles.BottomContainer__BlockContainer_SubContainer_Box_left>
    </styles.BottomContainer__BlockContainer_SubContainer>
  );
}
