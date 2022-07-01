import { atom } from "recoil";

import { ITodos } from "./interfaces";

export const toDoState = atom<ITodos>({
  key: "toDo",
  default: {
    "To Do": ["1", "2"],
    Doing: ["3"],
    Done: ["4"],
  },
});
