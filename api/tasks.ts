import axios from "axios";

import { ITask } from "@store/interfaces";
import { IFactory } from "./interface";

export const tasksFactory = ({ baseUrl }: IFactory) => {
  // NOTE [Get]
  const getTasks = async () => {
    return await (await axios.get(baseUrl)).data();
  };

  // NOTE [Create]
  const createTask = async (task: ITask) => {
    return await axios
      .post(baseUrl, task, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => res.data);
  };

  // NOTE [Update]
  const updateTask = async (task: ITask) => {
    return await (
      await axios.put(baseUrl, task, {
        headers: {
          "Content-Type": "application/json",
        },
      })
    ).data();
  };

  return { getTasks, createTask, updateTask };
};
