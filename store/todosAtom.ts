import { atom } from "recoil";

import { ITodos } from "./interfaces";

export const toDoState = atom<ITodos>({
  key: "toDo",
  default: {
    "To Do": new Map(),
    Doing: new Map(),
    Done: new Map(),
  },
});
