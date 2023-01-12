class Model {
  constructor() {
    this.localStorageKey = 'todos';
    this.state = {
      todos: [],
      filter: '',
    };
  }

  #save() {
    localStorage.setItem(this.localStorageKey, this.state);
  }

  addTodo(todo) {
    this.state.todos.push({
      title: todo.title,
      checked: todo.checked,
    });
    this.#save();
  }

  getTodos() {
    this.state = JSON.parse(localStorage.getItem(this.localStorageKey)) || [];
  }
}

export default new Model();
