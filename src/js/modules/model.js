import { generateId } from './utils/helpers';

class Model {
  constructor() {
    this.localStorageKey = 'todos';
    this.state = {
      todos: [],
      filter: '',
    };
  }

  #save() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.state.todos));
  }

  addTodo(todo) {
    const newTodo = {
      ...todo,
      id: `id_${generateId()}`,
    };
    this.state.todos.push(newTodo);
    this.#save();
  }

  getTodos(handler) {
    this.state.todos = JSON.parse(localStorage.getItem(this.localStorageKey)) || [];
    handler(this.state.todos);
  }
}

export default new Model();
