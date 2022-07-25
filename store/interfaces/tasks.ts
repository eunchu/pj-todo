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
  label: {
    name: string;
    desc: string;
    color: {
      text: string;
      bg: string;
    };
  };
  assignees: { id: number; name: string; profileImg: string | null }[];
  issueType: string;
}

export interface ITasks {
  [key: string]: ITask[];
}
