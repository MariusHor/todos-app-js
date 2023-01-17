import { $el, formatInput } from '../utils/helpers';
import View from './View';

class InputView extends View {
  constructor() {
    super();
    this.parentEl = $el('.form');
    this.input = $el('[data-todo="user-input"]');
    this.formCheckbox = $el('[data-form="checkbox-input"]');
    this.tooltips = [
      {
        selector: '.button--submit',
        content: 'Add todo',
        placement: 'right-end',
        theme: 'violet',
      },
      {
        selector: '[data-form="checkbox-label"]',
        content: 'Toggle todo',
        placement: 'left-end',
        theme: 'violet',
      },
    ];
    this.renderTooltips(...this.tooltips);
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
