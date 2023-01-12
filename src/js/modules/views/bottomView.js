import { $el, $$el } from '../utils/helpers';
import View from './View';

class BottomView extends View {
  constructor() {
    super();
    this.parentEl = $el('.content__bottom');
    this.filters = $$el('.filter');
    this.counter = $el('.content__counter');
  }

  setFilterActive(filter) {
    this.filters.forEach(fl => fl.classList.remove('button--current'));
    $el(`[data-filter="${filter}"]`).classList.add('button--current');
  }

  bindFilters(handler) {
    this.parentEl.addEventListener('click', event => {
      const element = event.target.closest('[data-filter]');
      if (!element) return;
      const { filter } = element.dataset;
      this.setFilterActive(filter, element);
      handler(filter);
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
    this.counter.textContent = `${data.length} todos left`;
  }
}

export default new BottomView();
