import { generateId } from './utils/helpers';

class Model {
  constructor() {
    this.localStorageKey = 'state';
    this.state = {
      todos: [],
      filter: '',
    };
  }

  #save() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.state));
  }

  getState(handler) {
    this.state = JSON.parse(localStorage.getItem(this.localStorageKey)) || {};
    handler(this.state);
  }

  getFilter() {
    this.state.filter = JSON.parse(localStorage.getItem(this.localStorageKey)).filter || [];
  }

  addTodo(todo) {
    const newTodo = {
      ...todo,
      id: `id_${generateId()}`,
    };
    this.state.todos.push(newTodo);
    this.#save();
  }

  deleteTodo(id) {
    this.state.todos = this.state.todos.filter(todo => todo.id !== id);
    this.#save();
  }

  getActiveTodos() {
    this.active = this.state.todos.filter(todo => !todo.checked);
    return this.active;
  }

  getCompletedTodos() {
    this.completed = this.state.todos.filter(todo => todo.checked);
    return this.completed;
  }

  setFilter(filter) {
    this.state.filter = filter;
    this.#save();
  }
}

export default new Model();
