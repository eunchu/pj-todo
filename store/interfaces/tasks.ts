export enum ETask {
  "To Do" = "To Do",
  "In Progress" = "In Progress",
  "Review" = "Review",
  "Done" = "Done",
}

export interface ITask {
  id: number;
  title: string;
}

export interface ITasks {
  [key: string]: ITask[];
}
