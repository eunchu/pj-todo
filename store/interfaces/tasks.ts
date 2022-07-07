export enum EBoard {
  ToDo = "To Do",
  InProgress = "In Progress",
  Review = "Review",
  Done = "Done",
}

export interface ITask {
  id: number;
  title: string;
  desc: string;
  createDate: string;
  label: string;
  assignees: string[];
  issueType: string;
}

export interface ITasks {
  [key: string]: ITask[];
}
