import { atom } from "recoil";
import { v1 } from "uuid";

// import { ITask } from "./interfaces";

export const taskState = atom({
  key: `toDo-${v1()}`,
  default: {
    "To Do": [],
    "In Progress": [],
    Review: [],
    Done: [],
  },
});
