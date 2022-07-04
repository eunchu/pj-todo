export interface ITodo {
  id: number;
  title: string;
}

export interface ITodos {
  [key: string]: ITodo[];
}
