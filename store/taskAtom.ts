import { atom } from "recoil";

import { ITasks } from "./interfaces";

export const taskState = atom<ITasks>({
  key: "toDo",
  default: {
    "To Do": [],
    "In Progress": [],
    Review: [],
    Done: [],
  },
});
