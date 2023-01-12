import { $el } from '../utils/helpers';
import View from './View';

class TodoView extends View {
  constructor() {
    super();
    this.parentEl = $el('.list');
  }

  bindDeleteTodo(handler) {
    this.parentEl.addEventListener('click', event => {
      const deleteBtn = event.target.closest('.button--remove-todo');
      if (!deleteBtn) return;
      const { id } = deleteBtn.parentElement.dataset;
      handler(id);
    });
  }

  bindCheckTodo(handler) {
    this.parentEl.addEventListener('click', event => {
      const checkbox = event.target.closest('label');
      if (!checkbox) return;
      const { id } = checkbox.parentElement.dataset;
      handler(id);
    });
  }
}

export default new TodoView();
