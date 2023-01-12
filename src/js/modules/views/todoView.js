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
}

export default new TodoView();
