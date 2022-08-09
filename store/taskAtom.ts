import { atom } from "recoil";
import { v1 } from 'uuid';

import { ITasks } from "./interfaces";

export const taskState = atom<ITasks>({
  key: `toDo-${v1()}`,
  default: {
    "To Do": [],
    "In Progress": [],
    Review: [],
    Done: [],
  },
});
