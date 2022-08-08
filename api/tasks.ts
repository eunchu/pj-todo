import axios from "axios";
import { IFactory } from "./interface";

export const tasksFactory = ({ baseUrl }: IFactory) => {
  const getTasks = async () => {
    return await (await axios.get(`${baseUrl}/task`)).data();
  };

  return { getTasks };
};
