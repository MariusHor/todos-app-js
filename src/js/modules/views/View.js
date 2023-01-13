import { $el } from '../utils/helpers';

class View {
  constructor() {
    this.parentEl = document.querySelector('#app');
    this.input = $el('[data-todo="user-input"]');
    this.data = [];
  }

  focusInput() {
    this.input.focus();
  }

  clear() {
    this.parentEl.innerHTML = '';
  }

  renderError(message) {
    const markup = `
      <li class="list__empty">
          <p>${message}</p>
      </li>
    `;
    this.clear();
    this.parentEl.insertAdjacentHTML('afterbegin', markup);
  }
}
export default View;
