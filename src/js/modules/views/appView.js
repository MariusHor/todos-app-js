import { $el } from '../utils/helpers';
import View from './View';

class AppView extends View {
  constructor() {
    super();
    this.parentEl = $el('.root');
  }

  #themeBtn = $el('[data-theme="switch"]');

  #counter = $el('.content__counter');

  handleInitialTheme(theme) {
    this.parentEl.classList.remove('root--dark', 'root--light');
    this.parentEl.classList.toggle(`root--${theme}`);
  }

  handleSwitchTheme(handler) {
    this.#themeBtn.addEventListener('click', () => {
      this.parentEl.classList.toggle('root--light');
      this.parentEl.classList.toggle('root--dark');

      if (this.parentEl.matches('.root--dark')) {
        handler('dark');
      } else if (this.parentEl.matches('.root--light')) handler('light');
    });
  }

  handleClearCompleted(handler) {
    this.parentEl.addEventListener('click', event => {
      const clearBtn = event.target.closest('[data-remove="all"]');
      if (!clearBtn) return;
      handler();
    });
  }

  renderCounter(data) {
    this.#counter.textContent = `${data.length} ${data.length === 1 ? 'todo' : 'todos'} left`;
  }
}

export default new AppView();
