import { $el } from '../utils/helpers';
import View from './View';

class TodoView extends View {
  constructor() {
    super();
    this.parentEl = $el('.list');
  }

  handleDeleteTodo(handler) {
    this.parentEl.addEventListener('click', event => {
      const deleteBtn = event.target.closest('[data-remove="todo"]');
      if (!deleteBtn) return;
      const { id } = deleteBtn.parentElement.dataset;
      handler(id);
    });
  }

  handleToggleTodo(handler) {
    this.parentEl.addEventListener('click', event => {
      const checkbox = event.target.closest('[data-toggle="todo"]');
      if (!checkbox) return;
      const { id } = checkbox.parentElement.dataset;
      handler(id);
    });
  }

  handleEditTodo(handler) {
    let prevData;
    this.parentEl.addEventListener('dblclick', event => {
      const textEl = event.target.closest('[data-edit="todo"]');
      if (textEl && !textEl.classList.contains('list__todo--done')) {
        textEl.contentEditable = true;
        prevData = textEl.innerText;
      }
    });
    this.parentEl.addEventListener('focusout', event => {
      const textEl = event.target.closest('[data-edit="todo"]');
      if (textEl) {
        textEl.contentEditable = false;
        const data = textEl.innerText.trim();
        const { id } = textEl.parentElement.dataset;
        if (!data.length) {
          textEl.innerText = prevData;
        } else {
          handler(id, data);
        }
      }
    });
  }
}

export default new TodoView();
