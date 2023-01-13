import { $el, formatInput } from '../utils/helpers';
import View from './View';

class InputView extends View {
  constructor() {
    super();
    this.parentEl = $el('.form');
    this.formCheckbox = $el('[data-todo="form-checkbox"]');
  }

  #getNewTodo() {
    const title = formatInput(this.input.value);
    const { checked } = this.formCheckbox;
    this.input.value = '';
    return { title, checked };
  }

  bindAddTodo(handler) {
    this.parentEl.addEventListener('submit', event => {
      event.preventDefault();
      const todo = this.#getNewTodo();
      handler(todo);
      if (!todo.length) return;
      this.focusInput();
    });
  }
}

export default new InputView();
