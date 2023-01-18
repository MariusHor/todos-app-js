import { $el } from '../utils/helpers';
import View from './View';
import tooltipView from './tooltipView';

class TodosListView extends View {
  constructor() {
    super();
    this.parentEl = $el('.list');
    this.messages = {
      all: 'Please add a new todo!',
      active: 'There are no active todos.',
      completed: 'There are no completed todos yet.',
    };
  }

  static #generateMarkup(todo) {
    return `
        <li class="list__item" data-id="${todo.id}">
            <input 
              type="checkbox" 
              name="checkbox"
              data-toggle="todo"
              id="checkbox-${todo.id}" 
              aria-label="toggle todo"
              ${todo.checked ? 'checked' : ''}
            >
            <label for="checkbox-${todo.id}" data-todo="checkbox"></label>
            <span 
              class="list__todo ${todo.checked ? 'list__todo--done' : 'list__todo--active'}" 
              data-edit="todo">${todo.title}
            </span>
            <button class="button button--remove-todo" data-remove="todo" aria-label="delete todo">
              <i class="fa-solid fa-trash"></i>
            </button>
        </li>
    `;
  }

  #mapTodos() {
    return this.data.map(item => TodosListView.#generateMarkup(item)).join('');
  }

  render(data, filter) {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      this.clear();
      this.renderEmptyFilter(this.messages[filter]);
    } else {
      this.data = data;
      const markup = this.#mapTodos();
      this.clear();
      this.parentEl.insertAdjacentHTML('afterbegin', markup);
      //
      tooltipView.renderTooltips();
    }
  }

  bindControlSortable(handler) {
    handler(this.parentEl);
  }

  renderEmptyFilter(message) {
    const markup = `
      <li class="list__empty">
          <p>${message}</p>
      </li>
    `;
    this.clear();
    this.parentEl.insertAdjacentHTML('afterbegin', markup);
  }
}

export default new TodosListView();
