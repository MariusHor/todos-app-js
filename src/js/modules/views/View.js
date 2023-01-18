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
}
export default View;
