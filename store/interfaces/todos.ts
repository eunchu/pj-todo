export interface ITodo {
  id: string;
  title: string;
  droppableId: string;
  index: number;
}

export interface ITodos {
  [key: string]: Map<string, ITodo>;
}
