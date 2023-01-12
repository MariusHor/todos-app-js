import { $el } from '../utils/helpers';
import View from './View';

class TodosListView extends View {
  constructor() {
    super();
    this.parentEl = $el('.list');
  }

  static #generateMarkup(todo) {
    return `
        <li class="list__item">
            <input class="checkbox" type="checkbox" id="${todo.id}">
            <label for="${todo.id}"></label>
            <span class="list__todo">${todo.title}</span>
            <button class="button button--remove-todo" aria-label="delete todo">
                <i class="fa-solid fa-xmark"></i>
            </button>
        </li>
    `;
  }

  #mapTodos() {
    return this.data.map(item => TodosListView.#generateMarkup(item)).join('');
  }

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      // this.renderError();
    } else {
      this.data = data;
      const markup = this.#mapTodos();
      this.clear();
      this.parentEl.insertAdjacentHTML('afterbegin', markup);
    }
  }
}

export default new TodosListView();
