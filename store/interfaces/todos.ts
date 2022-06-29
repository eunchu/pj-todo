export interface ITodo {
  id: string;
  title: string;
  droppableId: string;
  index: number;
}

export interface ITodos {
  toDo: Map<string, ITodo>;
  doing: Map<string, ITodo>;
  done: Map<string, ITodo>;
}
