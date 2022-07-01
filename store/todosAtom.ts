import { atom } from "recoil";

import { ITodos } from "./interfaces";

export const toDoState = atom<ITodos>({
  key: "toDo",
  default: {
    "To Do": ["1", "2"],
    "In Progress": ["3"],
    Review: ["4"],
    Done: ["5", "6"],
  },
});
