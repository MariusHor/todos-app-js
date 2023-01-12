import { $el, formatInput } from '../utils/helpers';
import View from './View';
import modal from './modalView';

class InputView extends View {
  constructor() {
    super();
    this.parentEl = $el('[data-todo="form"]');
    this.input = $el('[data-todo="user-input"]');
    this.formCheckbox = $el('[data-todo="form-checkbox"]');
  }

  getNewTodo() {
    const title = formatInput(this.input.value);
    const { checked } = this.formCheckbox;
    this.input.value = '';
    return { title, checked };
  }

  renderInputError(error) {
    modal.showModal(error.message);
  }

  focusInput() {
    this.input.focus();
  }

  bindAddTodo(handler) {
    this.parentEl.addEventListener('submit', event => {
      event.preventDefault();
      handler();
    });
  }
}

export default new InputView();
