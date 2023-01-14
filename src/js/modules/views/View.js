import { $el } from '../utils/helpers';

class View {
  constructor() {
    this.parentEl = $el('#app');
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
