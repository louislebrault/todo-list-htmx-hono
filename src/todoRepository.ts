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
  },
  delete: (id) => {
    const index = todos.findIndex(todo => todo.id === id)

    if (index !== -1) {
      todos.splice(index, 1)
    }

    console.log('todos', todos)

    return Promise.resolve(true)
  }
}

export default todoRepository
