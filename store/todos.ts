import { atom } from "recoil";

import { ITodos } from "./interfaces";

export const toDoState = atom<ITodos>({
  key: "toDo",
  default: {
    toDo: new Map(),
    doing: new Map(),
    done: new Map(),
  },
});
