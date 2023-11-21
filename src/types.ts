export type Todo = {
  id: number;
  title: string;
  index: number;
}

export type TodoForm = {
  title: string;
}

export type TodoRepository = {
  add: (todo: TodoForm) => Promise<Todo>;
  getAll: () => Promise<Todo[]>;
}
