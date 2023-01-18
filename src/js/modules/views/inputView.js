import { $el, formatInput } from '../utils/helpers';
import View from './View';

class InputView extends View {
  constructor() {
    super();
    this.parentEl = $el('.form');
    this.input = $el('[data-form="user-input"]');
    this.formCheckbox = $el('[data-form="checkbox-input"]');
    this.submitBtn = $el('.button--submit');
    this.#handleInputEvent();
  }

  #handleInputEvent() {
    this.input.addEventListener('keyup', () => {
      this.#handleEmptyInput();
    });
  }

  #handleEmptyInput() {
    if (!this.input.value.trim().length) {
      this.submitBtn.setAttribute('disabled', '');
    } else {
      this.submitBtn.removeAttribute('disabled');
    }
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
      this.#handleEmptyInput();
      const todo = this.#getNewTodo();
      handler(todo);
      this.focusInput();
    });
  }
}

export default new InputView();
