import { generateId } from './utils/helpers';
import { LOCAL_STORAGE_KEY } from './utils/config';

class Model {
  #save() {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this.state));
  }

  getState(handler) {
    this.state = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {};
    handler(this.state);
  }

  setFilter(filter) {
    this.state.filter = filter;
    this.#save();
  }

  setTheme(theme) {
    this.state.theme = theme;
    this.#save();
  }

  addTodo(todo) {
    const newTodo = {
      ...todo,
      id: `id_${generateId()}`,
    };
    if (!this.state.todos) this.state.todos = [];
    this.state.todos.unshift(newTodo);
    this.#save();
  }

  deleteTodo(id) {
    this.state.todos = this.state.todos.filter(todo => todo.id !== id);
    this.#save();
  }

  toggleTodo(id) {
    this.state.todos = this.state.todos.map(todo =>
      todo.id === id ? { ...todo, checked: !todo.checked } : todo,
    );
    this.#save();
  }

  editTodo(id, text) {
    this.state.todos = this.state.todos.map(todo =>
      todo.id === id ? { ...todo, title: text } : todo,
    );
    this.#save();
  }

  getActiveTodos() {
    this.active = this.state.todos?.filter(todo => !todo.checked) ?? [];
    return this.active;
  }

  getCompletedTodos() {
    this.completed = this.state.todos?.filter(todo => todo.checked) ?? [];
    return this.completed;
  }

  removeCompleted() {
    this.state.todos = this.state.todos.filter(todo => !todo.checked);
    this.#save();
  }
}

export default new Model();
