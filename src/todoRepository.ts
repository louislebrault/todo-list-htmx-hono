import {TodoRepository} from "../../domain/types/repositories"

const todos = []

const todoRepository: TodoRepository = {
  add: (todoForm) => {
    const newTodo = {
      id: todos.length + 1,
      title: todoForm.title,
      index: todos.length
    }

    todos.push(newTodo)

    return Promise.resolve(newTodo)
  },
  getAll: () => {
    return Promise.resolve(todos)
  }
}

export default todoRepository
