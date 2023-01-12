import { $el } from '../utils/helpers';
import View from './View';

class TodoView extends View {
  constructor() {
    super();
    this.parentEl = $el('.list');
  }

  bindDeleteTodo(handler) {
    this.parentEl.addEventListener('click', event => {
      const deleteBtn = event.target.closest('[data-remove="todo"]');
      if (!deleteBtn) return;
      const { id } = deleteBtn.parentElement.dataset;
      handler(id);
    });
  }

  bindCheckTodo(handler) {
    this.parentEl.addEventListener('click', event => {
      const checkbox = event.target.closest('[data-toggle="todo"]');
      if (!checkbox) return;
      const { id } = checkbox.parentElement.dataset;
      handler(id);
    });
  }

  bindEditTodo(handler) {
    this.parentEl.addEventListener('dblclick', event => {
      const textEl = event.target.closest('[data-edit="todo"]');
      if (textEl) {
        textEl.contentEditable = true;
      }
    });
    this.parentEl.addEventListener('focusout', event => {
      const textEl = event.target.closest('[data-edit="todo"]');
      if (textEl) {
        textEl.contentEditable = true;
        const data = textEl.innerText;
        const { id } = textEl.parentElement.dataset;
        handler(id, data);
      }
      textEl.contentEditable = false;
    });
  }
}

export default new TodoView();
