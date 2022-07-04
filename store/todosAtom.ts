import { atom } from "recoil";

import { ITodos } from "./interfaces";

export const toDoState = atom<ITodos>({
  key: "toDo",
  default: {
    "To Do": [
      {
        id: 1,
        title: "hi1",
      },
      { id: 2, title: "hi2" },
    ],
    "In Progress": [],
    Review: [],
    Done: [],
  },
});
