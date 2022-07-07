import { atom } from "recoil";

import { ITasks } from "./interfaces";

export const taskState = atom<ITasks>({
  key: "toDo",
  default: {
    "To Do": [
      // {
      //   id: 1,
      //   title: "hi1",
      // },
      // { id: 2, title: "hi2" },
    ],
    "In Progress": [],
    Review: [],
    Done: [],
  },
});
