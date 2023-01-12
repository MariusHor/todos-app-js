import { generateId } from './utils/helpers';

class Model {
  constructor() {
    this.localStorageKey = 'todos';
    this.state = {
      todos: [],
      filter: '',
    };
  }

  #saveTodos() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.state.todos));
  }

  getTodos(handler) {
    this.state.todos = JSON.parse(localStorage.getItem(this.localStorageKey)) || [];
    handler(this.state.todos);
  }

  addTodo(todo) {
    const newTodo = {
      ...todo,
      id: `id_${generateId()}`,
    };
    this.state.todos.push(newTodo);
    this.#saveTodos();
  }

  deleteTodo(id) {
    this.state.todos = this.state.todos.filter(todo => todo.id !== id);
    this.#saveTodos();
  }
}

export default new Model();
