import { $el } from '../utils/helpers';
import View from './View';

class AppView extends View {
  constructor() {
    super();
    this.parentEl = $el('.root');
    this.themeBtn = $el('[data-theme="switch"]');
  }

  switchTheme() {
    this.themeBtn.addEventListener('click', () => {
      this.parentEl.classList.toggle('root--light');
      this.parentEl.classList.toggle('root--dark');
    });
  }
}

export default new AppView();
