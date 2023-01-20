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

  #handleSubmitBtn() {
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

  #handleInputEvent() {
    this.input.addEventListener('keyup', () => {
      this.#handleSubmitBtn();
    });
  }

  handleAddTodo(handler) {
    this.parentEl.addEventListener('submit', event => {
      event.preventDefault();
      const todo = this.#getNewTodo();
      handler(todo);
      this.focusInput();
      this.#handleSubmitBtn();
    });
  }
}

export default new InputView();
