import { $el } from '../utils/helpers';
import View from './View';

class AppView extends View {
  constructor() {
    super();
    this.parentEl = $el('.root');
    this.themeBtn = $el('[data-theme="switch"]');
    this.counter = $el('.content__counter');
    this.tooltips = [
      {
        selector: this.themeBtn,
        content: 'Switch theme',
        placement: 'right-end',
        theme: 'violet',
      },
    ];
    this.renderTooltips(...this.tooltips);
  }

  switchTheme() {
    this.themeBtn.addEventListener('click', () => {
      this.parentEl.classList.toggle('root--light');
      this.parentEl.classList.toggle('root--dark');
    });
  }

  bindClearCompleted(handler) {
    this.parentEl.addEventListener('click', event => {
      const clearBtn = event.target.closest('[data-remove="all"]');
      if (!clearBtn) return;
      handler();
    });
  }

  renderCounter(data) {
    this.counter.textContent = `${data.length} ${data.length === 1 ? 'todo' : 'todos'} left`;
  }
}

export default new AppView();
