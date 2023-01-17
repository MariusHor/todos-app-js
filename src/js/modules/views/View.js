import tippy from 'tippy.js';
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

  renderTooltips(...tooltips) {
    const mediaQuery = window.matchMedia('(min-width: 62em)');
    if (mediaQuery.matches) {
      tooltips.forEach(tooltip => {
        tippy(tooltip.selector, {
          content: tooltip.content,
          placement: tooltip.placement,
          theme: tooltip.theme,
        });
      });
    }
  }
}
export default View;
